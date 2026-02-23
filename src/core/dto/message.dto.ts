import {
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { FromDto } from './from.dto';
import { LocationDto } from './location.dto';

export class MessageDto {
  @IsNotEmpty()
  @IsInt()
  @Expose({ name: 'message_id' })
  readonly messageId: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => FromDto)
  readonly from: FromDto;

  @IsOptional()
  @IsObject()
  readonly chat: object;

  @IsOptional()
  @IsInt()
  readonly date: number;

  @IsOptional()
  readonly text: string;

  @IsOptional()
  readonly location: LocationDto;
}
