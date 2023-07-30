import { Controller, Get, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { KakaoAuthGuard } from './kakao/kakao.auth.guard';
import { UserDto } from 'src/users/dto/users.dto';
import { RequestUser } from 'src/users/users.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiExcludeEndpoint()
  @Get('kakao/callback')
  @UseGuards(KakaoAuthGuard)
  async kakaoCallback(@RequestUser() userData: UserDto) {
    const { access_token } = await this.authService.login(userData);
    return access_token;
  }
}
