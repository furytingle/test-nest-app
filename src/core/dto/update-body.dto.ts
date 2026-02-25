import {
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { MessageDto } from './message.dto';

export class UpdateBodyDto {
  @IsNotEmpty()
  @IsInt()
  @Expose({ name: 'update_id' })
  readonly updateId: bigint;

  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => MessageDto)
  readonly message?: MessageDto | null;
}
