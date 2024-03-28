import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { AddClientDto } from './AddClientDto.dto';
export class UpdateClientDto extends PartialType(AddClientDto) {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  phoneNumber: string;

 
  @IsOptional()
  address: string;

 
  @IsOptional()
  note: string;
}
