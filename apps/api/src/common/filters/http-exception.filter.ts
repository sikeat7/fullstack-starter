import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import type { Request, Response } from 'express'
import { Prisma } from '@prisma/client'
import type { z } from '@repo/data'

type ZodError = z.ZodError
type ZodIssue = z.ZodIssue

/**
 * Filtro global de excepciones
 *
 * Captura y formatea todos los errores de la aplicación de forma consistente
 * Maneja casos especiales como errores de Prisma y validación Zod
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('GlobalExceptionFilter')

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let message: string | string[] = 'Error interno del servidor'
    let errorCode: string | undefined
    let errors: any

    // 1. Errores HTTP de NestJS
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
    // 2. Errores de validación Zod
    else if (this.isZodError(exception)) {
      status = HttpStatus.BAD_REQUEST
      message = 'Error de validación'
      errorCode = 'VALIDATION_ERROR'
      errors = exception.issues.map(err => ({
        field: err.path.join('.'),
        message: err.message,
        code: err.code,
      }))
    }
    // 3. Errores de Prisma (base de datos)
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
    // 4. Errores de validación de Prisma
    else if (exception instanceof Prisma.PrismaClientValidationError) {
      status = HttpStatus.BAD_REQUEST
      message = 'Error de validación en la base de datos'
      errorCode = 'DATABASE_VALIDATION_ERROR'
    }
    // 5. Errores genéricos
    else if (exception instanceof Error) {
      message = exception.message
    }

    // Crear respuesta de error estandarizada
    const errorResponse: any = {
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
    }

    // Agregar código de error si existe
    if (errorCode) {
      errorResponse.errorCode = errorCode
    }

    // Agregar errores detallados si existen
    if (errors) {
      errorResponse.errors = errors
    }

    // En desarrollo, incluir stack trace
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

    // Log del error
    const logMessage = `${request.method} ${request.url} - Status: ${status}`

    if (status >= 500) {
      // Errores del servidor (5xx) - log error
      this.logger.error(
        logMessage,
        exception instanceof Error ? exception.stack : String(exception),
      )
    } else if (status >= 400) {
      // Errores del cliente (4xx) - log warning
      this.logger.warn(logMessage)
    }

    // Enviar respuesta
    response.status(status).json(errorResponse)
  }

  /**
   * Type guard para verificar si es un error de Zod
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
   * Maneja errores específicos de Prisma
   */
  private handlePrismaError(error: Prisma.PrismaClientKnownRequestError): {
    status: number
    message: string
    code: string
  } {
    switch (error.code) {
      // Registro no encontrado
      case 'P2025':
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Registro no encontrado',
          code: 'RECORD_NOT_FOUND',
        }

      // Violación de clave única
      case 'P2002': {
        const target = error.meta?.target as string[]
        const field = target ? target.join(', ') : 'campo'
        return {
          status: HttpStatus.CONFLICT,
          message: `Ya existe un registro con ese ${field}`,
          code: 'UNIQUE_CONSTRAINT_VIOLATION',
        }
      }

      // Violación de clave foránea
      case 'P2003':
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Referencia inválida a registro relacionado',
          code: 'FOREIGN_KEY_CONSTRAINT_VIOLATION',
        }

      // Violación de constraint requerido
      case 'P2011': {
        const nullConstraint = error.meta?.constraint as string
        return {
          status: HttpStatus.BAD_REQUEST,
          message: `El campo ${nullConstraint} es requerido`,
          code: 'NULL_CONSTRAINT_VIOLATION',
        }
      }

      // Fallo de conexión
      case 'P1001':
      case 'P1002':
        return {
          status: HttpStatus.SERVICE_UNAVAILABLE,
          message: 'No se puede conectar a la base de datos',
          code: 'DATABASE_CONNECTION_ERROR',
        }

      // Error genérico de Prisma
      default:
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error en la base de datos',
          code: `PRISMA_ERROR_${error.code}`,
        }
    }
  }
}
