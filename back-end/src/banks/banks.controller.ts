import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BankDto, BanksService } from './banks.service';
import mongoose from 'mongoose';

@Controller('banks')
export class BanksController {
  constructor(private banksService: BanksService) {}

  isIdValid(id: string) {
    const isIdValid = mongoose.Types.ObjectId.isValid(id);
    if (!isIdValid) throw new HttpException('Invaid Id', 400);
  }

  @Get()
  getBanks(){
    return this.banksService.getBanks()
  }
  @Post('/add-bank')
  @UsePipes(new ValidationPipe())
  async addBank(@Body() bankDto: BankDto) {
    const bank = await this.banksService.addBank(bankDto);
    return bank;
  }

  @Patch('/update-bank/:id')
  @UsePipes(new ValidationPipe())
  async updateBank(
    @Param('id') id: string,
    @Body() bankDto: BankDto,
  ) {
    this.isIdValid(id);

    const updateBank = await this.banksService.updateBank(id, bankDto);
    if (!updateBank) throw new HttpException('check not found', 404);
    return updateBank;
  }

  @Delete('/delete-bank/:id')
  async deleteBank(@Param('id') id: string) {
    this.isIdValid(id);
    const deletedBank = await this.banksService.deleteBank(id);
    if (!deletedBank) throw new HttpException('check not found', 404);
    return deletedBank;
  }

}