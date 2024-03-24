import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from 'src/schemas/Client.schema';
import { AddClientDto } from './dto/AddClientDto.dto';
import { User } from 'src/schemas/User.schema';
import { UpdateClientDto } from './dto/UpdateClientDto.dto';

@Injectable()
export class ClientsService {
  constructor(@InjectModel('client') private clientModel: Model<Client>) {}
  async addClient(addClientDto: AddClientDto) {
    const client = await this.clientModel.findOne({
      phoneNumber: addClientDto.phoneNumber,
    });
    if (client) {
      throw new HttpException(
        'phone number is alreadt taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newClient = new this.clientModel({ ...addClientDto });
    return newClient.save();
  }
  async updateClient(id: string, updateClientDto: UpdateClientDto) {
    return this.clientModel.findByIdAndUpdate(id, updateClientDto);
  }
  deleteClient(id: string) {
    return this.clientModel.findByIdAndDelete(id);
  }
  getClientById(id: string) {
    return this.clientModel.findById(id);
  }
}
