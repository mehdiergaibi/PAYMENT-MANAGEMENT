import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Check } from './Check.schema';
import mongoose from 'mongoose';

@Schema() // tells mongoose that is a schema of the collection user
export class Client {
  @Prop({ required: [true, 'client name is required'] }) // tells mongoose thats a property
  name: string;

  @Prop({
    required: [true, 'phone number is required'],
    unique: [true, 'phone number already exist'],
  })
  phoneNumber: string;

  @Prop({ required: false})
  address: string;

  @Prop({ required: false})
  note: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Check' }] })
  checks: Check[];
}
export const ClientSchema = SchemaFactory.createForClass(Client); // thiis retutn  the the schema
