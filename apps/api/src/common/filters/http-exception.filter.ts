import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'

import type { Request, Response } from 'express'
import type { z } from 'zod'

type ZodError = z.ZodError
type ZodIssue = z.ZodIssue

/**
 * Global exception filter
 *
 * Captures and formats all application errors consistently
 * Handles special cases like Prisma errors and Zod validation
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('GlobalExceptionFilter')

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let message: string | string[] = 'Internal server error'
    let errorCode: string | undefined
    let errors: any

    // 1. NestJS HTTP errors
    if (exception instanceof HttpException) {
      status = exception.getStatus()
      const exceptionResponse = exception.getResponse()

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const responseObj = exceptionResponse as Record<string, any>
        message = responseObj.message || exception.message
        errors = responseObj.errors
      }
    }
    // 2. Zod validation errors
    else if (this.isZodError(exception)) {
      status = HttpStatus.BAD_REQUEST
      message = 'Validation error'
      errorCode = 'VALIDATION_ERROR'
      errors = exception.issues.map(err => ({
        field: err.path.join('.'),
        message: err.message,
        code: err.code,
      }))
    }
    // 3. Prisma errors (database)
    else if (
      typeof exception === 'object' &&
      exception !== null &&
      'code' in exception &&
      exception instanceof Prisma.PrismaClientKnownRequestError
    ) {
      const prismaError = this.handlePrismaError(exception)
      status = prismaError.status
      message = prismaError.message
      errorCode = prismaError.code
    }
    // 4. Prisma validation errors
    else if (exception instanceof Prisma.PrismaClientValidationError) {
      status = HttpStatus.BAD_REQUEST
      message = 'Database validation error'
      errorCode = 'DATABASE_VALIDATION_ERROR'
    }
    // 5. Generic errors
    else if (exception instanceof Error) {
      message = exception.message
    }

    // Create standardized error response
    const errorResponse: any = {
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
    }

    // Add error code if exists
    if (errorCode) {
      errorResponse.errorCode = errorCode
    }

    // Add detailed errors if exist
    if (errors) {
      errorResponse.errors = errors
    }

    // In development, include stack trace
    const nodeEnv = process.env.NODE_ENV
    if (nodeEnv === 'development') {
      if (exception instanceof Error) {
        errorResponse.stack = exception.stack
      }
      if (
        typeof exception === 'object' &&
        exception !== null &&
        'code' in exception &&
        'meta' in exception &&
        exception instanceof Prisma.PrismaClientKnownRequestError
      ) {
        errorResponse.prisma = {
          code: (exception as any).code,
          meta: (exception as any).meta,
        }
      }
    }

    // Log the error
    const logMessage = `${request.method} ${request.url} - Status: ${status}`

    if (status >= 500) {
      // Server errors (5xx) - log error
      this.logger.error(
        logMessage,
        exception instanceof Error ? exception.stack : String(exception),
      )
    } else if (status >= 400) {
      // Client errors (4xx) - log warning
      this.logger.warn(logMessage)
    }

    // Send response
    response.status(status).json(errorResponse)
  }

  /**
   * Type guard to check if it's a Zod error
   */
  private isZodError(exception: unknown): exception is ZodError & { errors: ZodIssue[] } {
    return (
      typeof exception === 'object' &&
      exception !== null &&
      'issues' in exception &&
      Array.isArray((exception as any).issues)
    )
  }

  /**
   * Handles specific Prisma errors
   */
  private handlePrismaError(error: Prisma.PrismaClientKnownRequestError): {
    status: number
    message: string
    code: string
  } {
    switch (error.code) {
      // Record not found
      case 'P2025':
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Record not found',
          code: 'RECORD_NOT_FOUND',
        }

      // Unique key violation
      case 'P2002': {
        const target = error.meta?.target as string[]
        const field = target ? target.join(', ') : 'campo'
        return {
          status: HttpStatus.CONFLICT,
          message: `A record with that ${field} already exists`,
          code: 'UNIQUE_CONSTRAINT_VIOLATION',
        }
      }

      // Foreign key violation
      case 'P2003':
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Invalid reference to related record',
          code: 'FOREIGN_KEY_CONSTRAINT_VIOLATION',
        }

      // Required constraint violation
      case 'P2011': {
        const nullConstraint = error.meta?.constraint as string
        return {
          status: HttpStatus.BAD_REQUEST,
          message: `The field ${nullConstraint} is required`,
          code: 'NULL_CONSTRAINT_VIOLATION',
        }
      }

      // Connection failure
      case 'P1001':
      case 'P1002':
        return {
          status: HttpStatus.SERVICE_UNAVAILABLE,
          message: 'Cannot connect to database',
          code: 'DATABASE_CONNECTION_ERROR',
        }

      // Generic Prisma error
      default:
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Database error',
          code: `PRISMA_ERROR_${error.code}`,
        }
    }
  }
}
