import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  photos: string;

  @ApiProperty()
  @IsString()
  creditcard_type: string;

  @ApiProperty()
  @IsString()
  creditcard_number: string;

  @ApiProperty()
  @IsString()
  creditcard_name: string;

  @ApiProperty()
  @IsString()
  creditcard_expired: string;

  @ApiProperty()
  @IsString()
  creditcard_ccv: string;
}
