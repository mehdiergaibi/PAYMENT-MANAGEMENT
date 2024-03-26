import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/CreateUser.dto';
import { hashPassword } from 'src/utils/bcrypt';
import { LoginUserDto } from './dto/LoginUser.dto';
import { compare } from 'bcrypt';
import { UserResponseType } from 'src/types/userResponse.type';
import { sign } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class UserService {
  constructor(@InjectModel('user') private userModel: Model<User>) {}

  async createUSer(createUserDto: CreateUserDto) {
    const user = await this.userModel.findOne({ email: createUserDto.email });
    if (user) {
      throw new HttpException(
        'email is alreadt taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const password = hashPassword(createUserDto.password);
    const newUser = new this.userModel({ ...createUserDto, password });
    return newUser.save();
  }
  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userModel
      .findOne({ email: loginUserDto.email })
      .select('+password');
    if (!user) {
      throw new HttpException(
        'email not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isPasswordCorrect = await compare(
      loginUserDto.password,
      user.password,
    );
    //console.log(loginUserDto.password, user.password, isPasswordCorrect)
    if (!isPasswordCorrect) {
      throw new HttpException(
        'incorrect password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return user;
  }
  buildUserResponse(user: User): UserResponseType {
    return {
      username: user.username,
      email: user.email,
      token: this.genarateJWT(user),
      checks: user.checks
    };
  }
  genarateJWT(user: User): string {
    return sign({ email: user.email }, process.env.JWT_SECRET );
  }
  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
}
