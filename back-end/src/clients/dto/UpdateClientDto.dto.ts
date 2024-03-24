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
  @IsPhoneNumber()
  @IsOptional()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  address: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  note: string;
}
