import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGeolocationDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsOptional()
  @IsEmail()
  email: string;
}

export class GeolocationDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  lat: string;

  @IsString()
  @IsNotEmpty()
  lon: string;
}
