import { Module } from '@nestjs/common';
import { BanksController } from './banks.controller';
import { BanksService } from './banks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BankSchema } from 'src/schemas/Banks.schema';

@Module({
  imports: [
  MongooseModule.forFeature([
    {
      name: 'banks',
      schema: BankSchema
    }
  ])
],
  controllers: [BanksController],
  providers: [BanksService],
  exports: [BanksService]
})
export class BanksModule {}
