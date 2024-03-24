import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class AddClientDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phoneNumber: string;


  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  note: string;

}
