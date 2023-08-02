import { Controller, Get, UseGuards, Res, Query, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { KakaoAuthGuard } from './kakao/kakao.auth.guard';
import { RequestUser } from 'src/users/users.decorator';
import { GoogleAuthGuard } from './google/google.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@RequestUser() req) {
    return this.authService.googleLogin(req);
  }

  @Get('kakao/callback')
  @UseGuards(KakaoAuthGuard)
  async kakaoCallback(@RequestUser() req) {
    return await this.authService.kakaoLogin(req);
  }
}
