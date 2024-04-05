import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bank } from 'src/schemas/Banks.schema';
import { IsNotEmpty, IsString } from 'class-validator';

export class BankDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

@Injectable()
export class BanksService {
  constructor(@InjectModel('banks') private bankModel: Model<Bank>) {}

  getBanks() {
    return this.bankModel.find();
  }
  async addBank({ /* userId,clientId, */ ...bankDto }: BankDto) {
    const bank = await this.bankModel.findOne({
      bankName: bankDto.name,
    });
    if (bank) {
      throw new HttpException(
        'bank already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newBank = new this.bankModel(bankDto);
    const savedBank = await newBank.save();
    return savedBank;
  }
  async updateBank(id: string, bankDto: BankDto) {
    return this.bankModel.findByIdAndUpdate(id, bankDto);
  }
  deleteBank(id: string) {
    return this.bankModel.findByIdAndDelete(id);
  }
}