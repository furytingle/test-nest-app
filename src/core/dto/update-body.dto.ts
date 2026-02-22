import { IsInt, IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { MessageDto } from './message.dto';

export class UpdateBodyDto {
  @IsNotEmpty()
  @IsInt()
  @Expose({ name: 'update_id' })
  readonly updateId: bigint;

  @IsObject()
  @ValidateNested()
  @Type(() => MessageDto)
  readonly message: MessageDto;
}
