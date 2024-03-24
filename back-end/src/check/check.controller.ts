import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AddCheckDto } from './dto/AddCheck.dto';
import { CheckService } from './check.service';
import { UpdateCheckDto } from './dto/UpdateCheck.dto';
import mongoose from 'mongoose';
import { ExpressRequest } from 'src/middlewares/auth.middleware';

@Controller('check')
export class CheckController {
  constructor(private checkService: CheckService) {}

  isIdValid(id: string) {
    const isIdValid = mongoose.Types.ObjectId.isValid(id);
    if (!isIdValid) throw new HttpException('Invaid Id', 400);
  }

  /* @Get()
  getAllChecks() {
    return this.checkService.getAllChecks(@Request() request);
  } */
  @Get()
  getAllChecks(@Request() request: ExpressRequest) {
    //console.log(request.user);
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    }
    return request.user.checks;
  }

  @Get(':id')
  async getCheckById(@Param('id') id: string) {
    this.isIdValid(id);
    const findCheck = await this.checkService.getCheckById(id);
    if (!findCheck) throw new HttpException('check not found', 404);
    return findCheck;
  }

  @Post('/add-check')
  @UsePipes(new ValidationPipe())
  async addCheck(@Body() addCheckDto: AddCheckDto) {
    const check = await this.checkService.addCheck(addCheckDto);
    return check;
  }
  @Patch('/update-check/:id')
  @UsePipes(new ValidationPipe())
  async updateCheck(
    @Param('id') id: string,
    @Body() updateCheckDto: UpdateCheckDto,
  ) {
    this.isIdValid(id);

    const updatedUser = await this.checkService.updateCheck(id, updateCheckDto);
    if (!updatedUser) throw new HttpException('check not found', 404);
    return 'updated';
  }

  @Delete('/delete-check/:id')
  async deleteCheck(@Param('id') id: string) {
    this.isIdValid(id);
    const deletedCheck = await this.checkService.deleteCheck(id);
    if (!deletedCheck) throw new HttpException('check not found', 404);
    return 'deleted';
  }
}
