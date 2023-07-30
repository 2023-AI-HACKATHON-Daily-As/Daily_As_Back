import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/users/dto/users.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(userData: UserDto) {
    const { provider, email } = userData;

    const payload = { provider, email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
