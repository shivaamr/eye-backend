import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreatePatientDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNumber()
  age: number;

  @IsNotEmpty()
  gender: string;

  @IsOptional()
  address?: string;
}
