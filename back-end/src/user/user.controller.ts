import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe
  , Get, HttpException, HttpStatus, Request, Param, Delete
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { LoginUserDto } from './dto/LoginUser.dto';
import {ExpressRequest} from '../middlewares/auth.middleware'
import mongoose from 'mongoose';

//let users = [];

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  isIdValid(id: string){
    const isIdValid = mongoose.Types.ObjectId.isValid(id);
    if (!isIdValid) throw new HttpException('Invaid Id', 400);
  }
  @Post("/register")
  @UsePipes(new ValidationPipe())
  async createUser(@Body() createUserDto: CreateUserDto) {
    /* users.push(createUserDto);
    console.log(users); */
    const user = await this.userService.createUSer(createUserDto);
    return this.userService.buildUserResponse(user);
  }
  @Post('/login')
  @UsePipes(new ValidationPipe())
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    /* users.push(createUserDto);
    console.log(users); */
    const user = await this.userService.loginUser(loginUserDto)
    return this.userService.buildUserResponse(user)
  }
   @Get()
  async currentUser(@Request() request: ExpressRequest) {
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    }
    return this.userService.buildUserResponse(request.user)
  }
}
