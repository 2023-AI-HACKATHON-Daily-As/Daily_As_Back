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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/update/nickname')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '닉네임 설정 현재 작업중..',
  })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Success',
  //   // type: getAuthResDto,
  // })
  create(@GetUser() user, @Body() ninkname: string) {
    return this.usersService.updateNickname(user, ninkname);
  }
}
