import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Users } from 'src/users/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectModel('Users') private usersModel: Model<Users>,
  ) {}

  async tokenValidateUser(payload) {
    const user = await this.usersModel.find(payload.user.email);
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
        return await this.login(user);
      }
      return user;
    } catch (error) {
      console.log(error);
      return { ok: false, error: '구글 로그인 인증을 실패 하였습니다.' };
    }
  }

  /* Kako Login */
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
        return await this.login(user);
      }
      return user;
    } catch (error) {
      return { ok: false, error: '카카오 로그인 인증을 실패 하였습니다.' };
    }
  }

  async login(user: any) {
    const payload = {
      id: user.email,
    };
    return {
      token: this.jwtService.sign(
        { user: payload },
        this.configService.get('JWT_SECRET_KEY'),
      ),
      id: user.email,
    };
  }
}
