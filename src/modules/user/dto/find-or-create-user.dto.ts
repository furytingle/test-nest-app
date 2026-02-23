import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class FindOrCreateUserDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'first_name' })
  firstName: string;

  @Expose({ name: 'last_name' })
  lastName: string | null;

  @IsOptional()
  username: string | null;

  @IsOptional()
  @Expose({ name: 'language_code' })
  languageCode: string | null;
}
