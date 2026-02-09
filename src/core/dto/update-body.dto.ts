import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class UpdateBodyDto {
  @IsNotEmpty()
  @Expose({ name: 'update_id' })
  updateId: bigint;

  @IsString()
  @IsOptional()
  message: string | null;
}
