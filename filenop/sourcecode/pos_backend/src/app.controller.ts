// src/users/users.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dto/create-user.dto';

@Controller('users') // Đường dẫn gốc là /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register') // Đường dẫn con là /register
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
