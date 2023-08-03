import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(KakaoStrategy.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly usersService: UsersService,
  ) {
    super({
      clientID: configService.get<string>('KAKAO_REST_API_KEY'),
      clientSecret: configService.get<string>('KAKAO_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3000/auth/kakao/callback',
      scope: ['account_email', 'profile_nickname'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: any) {
    return {
      email: profile._json.kakao_account.email,
      password: profile.id,
    };
  }
}
