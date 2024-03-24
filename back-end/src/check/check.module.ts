import { Module } from '@nestjs/common';
import { CheckController } from './check.controller';
import { CheckService } from './check.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CheckSchema } from 'src/schemas/Check.schema';
import { UserSchema } from 'src/schemas/User.schema';
import { ClientSchema } from 'src/schemas/Client.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "check",
        schema: CheckSchema
      },
      {
        name: "user",
        schema: UserSchema
      },
      {
        name: "client",
        schema: ClientSchema
      }
    ]),
  ],
  controllers: [CheckController],
  providers: [CheckService]
})
export class CheckModule {}
