import { Controller, Get, UseGuards, Res, Query, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { KakaoAuthGuard } from './kakao/kakao.auth.guard';
import { RequestUser } from 'src/users/users.decorator';
import { GoogleAuthGuard } from './google/google.auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { getAuthResDto } from './dto/auth.dto';

@Controller('auth')
@ApiTags('Auth2.0')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({
    summary: '구글 소셜 로그인',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: getAuthResDto,
  })
  googleAuthRedirect(@RequestUser() req) {
    return this.authService.googleLogin(req);
  }

  @Get('kakao/callback')
  @UseGuards(KakaoAuthGuard)
  @ApiOperation({
    summary: '카카오 소셜 로그인',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: getAuthResDto,
  })
  async kakaoCallback(@RequestUser() req) {
    return await this.authService.kakaoLogin(req);
  }
}
