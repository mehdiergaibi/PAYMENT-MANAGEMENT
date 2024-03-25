import { AddCheckDto } from "./AddCheck.dto";
import { PartialType } from "@nestjs/mapped-types"
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Date } from 'mongoose';
export class UpdateCheckDto  extends PartialType(AddCheckDto) {

     @IsNotEmpty()
     @IsOptional()

    @IsString()
    CheckNumber: string;
  
    @IsNotEmpty()
    @IsOptional()
    CheckAmount: string;
  
    @IsNotEmpty()
    @IsOptional()
    DepositDate: Date;
  
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @IsIn([
      'AL AKHDAR BANK',
      'AL BARID BANK',
      'ARAB BANK',
      'ATTIJARIWAFA BANK',
      'BANK AL YOUSR',
      'BANK ASSAFA',
      'BANK OF AFRICA',
      'BANQUE CENTRALE POPULAIRE',
      'BMCI',
      'BTI BANK',
      'CDG CAPITAL',
      'CFG BANK',
      'CIH BANK',
      'CITIBANK MAGHREB',
      'CREDIT AGRICOLE DU MAROC',
      'CREDIT DU MAROC',
      'DAR EL AMANE',
      'SOCIÉTÉ GÉNÉRALE MAROC',
      'UMNIA BANK',
    ])
    BankName: string;
  
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    ClientName?: string;
  
    @IsNotEmpty()
    @IsOptional()

    @IsString()
    @IsIn(['deposited', 'pending', 'not deposited'])
    DepositStatus: string; 
}
