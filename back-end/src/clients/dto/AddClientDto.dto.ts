import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class AddClientDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;


  
  address: string;

  
  note: string;

}
