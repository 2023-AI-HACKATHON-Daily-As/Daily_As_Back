import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
    });
  }
  async validate(payload, done: VerifiedCallback): Promise<any> {
    console.log('sdfsdfs', payload);
    const user = await this.authService.tokenValidateUser(payload);

    if (!user) {
      return done(
        new UnauthorizedException({ message: 'user does not exist' }),
        false,
      );
    }

    return user;
  }
}
