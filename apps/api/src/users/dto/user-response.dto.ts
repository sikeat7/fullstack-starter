import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    example: 'clnjfg5q4000108l4g8h0h8j0',
    description: 'Unique identifier for the user',
  })
  id: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email address',
  })
  email: string;

  @ApiProperty({
    example: 'John',
    description: 'User first name',
  })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'User last name',
  })
  lastName: string;

  @ApiPropertyOptional({
    example: 'https://example.com/avatar.jpg',
    description: 'User profile picture URL',
    nullable: true,
  })
  profilePicture: string | null;

  @ApiProperty({
    example: 'USER',
    enum: ['ADMIN', 'USER'],
    description: 'User role',
  })
  role: string;

  @ApiProperty({
    example: true,
    description: 'Whether the user account is active',
  })
  isActive: boolean;

  @ApiPropertyOptional({
    example: '2024-01-15T10:30:00.000Z',
    description: 'When the email was verified',
    nullable: true,
  })
  emailVerifiedAt: Date | null;

  @ApiProperty({
    example: '2024-01-15T10:30:00.000Z',
    description: 'When the user was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:30:00.000Z',
    description: 'When the user was last updated',
  })
  updatedAt: Date;
}

export class UserListResponseDto {
  @ApiProperty({ type: [UserResponseDto] })
  data: UserResponseDto[];

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
