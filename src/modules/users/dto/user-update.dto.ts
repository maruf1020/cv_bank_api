// src/modules/users/dto/update-user.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { UserCreateDto } from './user-create.dto';

export class UserUpdateDto extends PartialType(UserCreateDto) {
  isActive?: boolean;
}
