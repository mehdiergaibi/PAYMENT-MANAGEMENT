import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date } from 'mongoose';

@Schema({ timestamps: true }) // tells mongoose that is a schema of the collection user
export class Check {
  @Prop({ required: true })
  CheckNumber: string;

  @Prop({ required: true })
  CheckAmount: string;

  @Prop({ required: true, type: Date })
  DepositDate: Date;

  @Prop({
    required: true,
    enum: [
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
      'UMNIA BANK'
    ],
  })
  BankName: string;

  @Prop({ required: true })
  ClientName: string;

  @Prop({
    type: String,
    enum: ['deposited', 'pending', 'not deposited'],
    required: true,
  })
  DepositStatus: string;
}
export const CheckSchema = SchemaFactory.createForClass(Check); // thiis retutn  the the schema
