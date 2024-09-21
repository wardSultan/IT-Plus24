import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGeolocationDto {
  @IsString()
  @IsNotEmpty()
  address: string;
}
