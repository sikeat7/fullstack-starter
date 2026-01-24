import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email address',
  })
  email: string;

  @ApiProperty({
    example: 'Password123!',
    description:
      'Password (min 8 chars, must contain uppercase, lowercase, and number)',
    minLength: 8,
  })
  password: string;

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
  profilePicture?: string | null;

  @ApiPropertyOptional({
    example: 'USER',
    enum: ['ADMIN', 'USER'],
    default: 'USER',
    description: 'User role',
  })
  role?: string;
}
