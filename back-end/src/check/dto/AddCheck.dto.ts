import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { Date } from 'mongoose';
export class AddCheckDto {
  @IsNotEmpty()
  @IsString()
  CheckNumber: string;

  @IsNotEmpty()
  CheckAmount: string;

  @IsNotEmpty()
  DepositDate: Date;

  @IsNotEmpty()
  @IsString()
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
  ClientName: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['Deposited', 'Pending', 'Not Deposited'])
  DepositStatus: string;

  /* @IsString()
  @IsNotEmpty()
  userId : string;

  @IsString()
  @IsNotEmpty()
  clientId : string; */

}
