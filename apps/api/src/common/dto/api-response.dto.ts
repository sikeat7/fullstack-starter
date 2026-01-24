import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ApiResponseDto<T> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiPropertyOptional()
  data?: T;

  @ApiPropertyOptional({ example: 'Operation completed successfully' })
  message?: string;
}

export class PaginatedResponseDto<T> {
  @ApiProperty({ isArray: true })
  data: T[];

  @ApiProperty({
    example: {
      total: 100,
      page: 1,
      limit: 10,
      totalPages: 10,
    },
  })
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export class ApiErrorDto {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: ['email must be a valid email'] })
  message: string | string[];

  @ApiPropertyOptional({ example: '2024-01-15T10:30:00.000Z' })
  timestamp?: string;

  @ApiPropertyOptional({ example: '/api/v1/users' })
  path?: string;
}
