import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class AddClientDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;


  
  address: string;

  
  note: string;

}
