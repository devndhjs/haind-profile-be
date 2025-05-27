import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get('users')
  getUsers(): Promise<User[]> {
    return this.appService.getUsers();
  }

  @Post('users')
  createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.appService.createUser(body.name, body.email);
  }
}
