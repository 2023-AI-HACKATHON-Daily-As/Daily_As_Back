import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Users } from 'src/users/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectModel('Users') private usersModel: Model<Users>,
  ) {}

  async tokenValidateUser(payload) {
    const user = await this.usersModel.findOne({
      email: payload.email,
      password: payload.password,
    });
    return user;
  }

  /* Google Login */
  async googleLogin(req): Promise<any> {
    try {
      const { email, password } = req;

      let user = await this.usersModel.findOne({ email });

      // 유저 생성
      if (!user) {
        user = await this.usersModel.create({
          email,
          password,
          provider: 'google',
        });
      }
      return await this.login(user);
    } catch (error) {
      console.log(error);
      return { statusCode: 500, error: '구글 로그인 인증을 실패 하였습니다.' };
    }
  }

  /* Kakao Login */
  async kakaoLogin(req): Promise<any> {
    try {
      const { email, password } = req;

      let user = await this.usersModel.findOne({ email });

      // 유저 생성
      if (!user) {
        user = await this.usersModel.create({
          email,
          password,
          provider: 'kakao',
        });
      }
      return await this.login(user);
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        error: '카카오 로그인 인증을 실패 하였습니다.',
      };
    }
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      password: user.password,
    };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET_KEY'),
    });

    return {
      statusCode: 200,
      userId: user.email,
      accessToken: token,
    };
  }
}
