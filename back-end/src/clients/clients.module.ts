import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientSchema } from 'src/schemas/Client.schema';
import { ClientsService } from './clients.service';

@Module({
  imports : [
    MongooseModule.forFeature([
      {
        name: "client",
        schema: ClientSchema
      }
    ])
  ],
  controllers: [ClientsController],
  providers: [ClientsService]
})
export class ClientsModule {}
