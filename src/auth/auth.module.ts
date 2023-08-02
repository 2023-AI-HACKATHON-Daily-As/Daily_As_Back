import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { KakaoStrategy } from './kakao/kakao.strategy';
import { KakaoAuthGuard } from './kakao/kakao.auth.guard';
import { JwtStrategy } from './jwt/jwt.strategy';
import { JwtAuthGuard } from './jwt/jwt.auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from 'src/users/schemas/user.schema';
import { GoogleStrategy } from './google/google.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }]),
    PassportModule,
    HttpModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_TOKEN_EXPIRATION_TIME'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    KakaoStrategy,
    KakaoAuthGuard,
    GoogleStrategy,
    KakaoAuthGuard,
    JwtStrategy,
    JwtAuthGuard,
    UsersService,
    AuthService,
  ],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
