import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/users.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.auth.guard';
import { GetUser } from 'src/custom-decorator/get-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  create(@GetUser() user) {
    console.log('TEST', user);
    return this.usersService.create(user);
  }
}
