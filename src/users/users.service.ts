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
  // constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    // const createdUser = new this.usersModel(createUserDto);
    // return createdUser.save();
  }

  async findOne(email, provider): Promise<any> {
    // return this.usersModel.findOne({ email, provider }).exec();
  }

  // findAll() {
  //   return `This action returns all users`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
