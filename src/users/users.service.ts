import { Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  FindByEmailAndProviderDto,
  UserDto,
} from './dto/users.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}

  async updateNickname(user: any, nickname: string) {
    const findUser = await this.usersModel.find(user._id);
    console.log(findUser);
    // findUser.nickname = nickname;
    // await findUser.save();
    return findUser;
  }
}
