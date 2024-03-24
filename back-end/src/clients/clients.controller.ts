import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { AddClientDto } from './dto/AddClientDto.dto';
import { UpdateClientDto } from './dto/UpdateClientDto.dto';
import mongoose from 'mongoose';

@Controller('clients')
export class ClientsController {
  constructor(private clientService: ClientsService) {}
  isIdValid(id: string) {
    const isIdValid = mongoose.Types.ObjectId.isValid(id);
    if (!isIdValid) throw new HttpException('Invaid Id', 400);
  }

  @Post('/add-client')
  @UsePipes(new ValidationPipe())
  async addClient(@Body() addClientDto: AddClientDto) {
    const client = await this.clientService.addClient(addClientDto);
    return client;
  }
  @Patch('/update-client/:id')
  @UsePipes(new ValidationPipe())
  async updateClient(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    this.isIdValid(id);

    const updatedClient = await this.clientService.updateClient(id, updateClientDto);
    if (!updatedClient) throw new HttpException('client not found', 404);
    return 'updated';
  }
  @Delete('/delete-client/:id')
  async deleteClient(@Param('id') id: string) {
    this.isIdValid(id);
    const deletedClient = await this.clientService.deleteClient(id);
    if (!deletedClient) throw new HttpException('client not found', 404);
    return 'deleted';
  }
  @Get(':id')
  async getClientById(@Param('id') id: string) {
    this.isIdValid(id);
    const findClient = await this.clientService.getClientById(id);
    if (!findClient) throw new HttpException('client not found', 404);
    return findClient;
  }
}
