import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema() // tells mongoose that is a schema of the collection user
export class Bank {
  @Prop({ required: [true, 'bank name is required'] }) // tells mongoose thats a property
  name: string;

}
export const BankSchema = SchemaFactory.createForClass(Bank); // thiis retutn  the the schema
  