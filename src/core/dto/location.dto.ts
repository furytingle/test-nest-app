import { IsNotEmpty, IsNumber } from 'class-validator';

export class LocationDto {
  @IsNotEmpty()
  @IsNumber()
  readonly longitude: number;

  @IsNotEmpty()
  @IsNumber()
  readonly latitude: number;
}
