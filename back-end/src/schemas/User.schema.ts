import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Check } from './Check.schema';
import mongoose from 'mongoose';

@Schema() // tells mongoose that is a schema of the collection user
export class User {
  @Prop({ required: [true, 'user name is required'] }) // tells mongoose thats a property
  username: string;

  @Prop({
    required: [true, 'email is required'],
    unique: [true, 'email already exist'],
  })
  email: string;

  @Prop({ required: [true, 'password is required'] })
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Check' }] })
  checks: Check[];
}
export const UserSchema = SchemaFactory.createForClass(User); // thiis retutn  the the schema
  