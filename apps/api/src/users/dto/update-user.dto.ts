import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    example: 'john.updated@example.com',
    description: 'Updated email address',
  })
  email?: string;

  @ApiPropertyOptional({
    example: 'NewPassword123!',
    description: 'New password',
  })
  password?: string;

  @ApiPropertyOptional({
    example: 'Johnny',
    description: 'Updated first name',
  })
  firstName?: string;

  @ApiPropertyOptional({
    example: 'Smith',
    description: 'Updated last name',
  })
  lastName?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Whether the user account is active',
  })
  isActive?: boolean;
}
