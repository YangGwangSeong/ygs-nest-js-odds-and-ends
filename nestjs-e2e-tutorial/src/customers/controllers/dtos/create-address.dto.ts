import { IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  addr: string;
  @IsString()
  zip: string;
}
