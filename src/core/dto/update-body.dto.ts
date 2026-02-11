import { IsNotEmpty, IsObject, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class UpdateBodyDto {
  @IsNotEmpty()
  @Expose({ name: 'update_id' })
  updateId: bigint;

  @IsObject()
  @IsOptional()
  message: object | null;
}
