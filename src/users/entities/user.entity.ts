import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserEntity implements User {
  @ApiProperty()
  user_id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  photos: string;

  @ApiProperty()
  creditcard_type: string;

  @ApiProperty()
  creditcard_number: string;

  @ApiProperty()
  creditcard_name: string;

  @ApiProperty()
  creditcard_expired: string;

  @ApiProperty()
  creditcard_ccv: string;
}
