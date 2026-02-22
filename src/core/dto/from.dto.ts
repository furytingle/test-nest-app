import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class FromDto {
  @IsNotEmpty()
  @IsInt()
  readonly id: number;

  @IsNotEmpty()
  @IsBoolean()
  @Expose({ name: 'is_bot' })
  readonly isBot: boolean;

  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'first_name' })
  readonly firstName: string;

  @Expose({ name: 'last_name' })
  readonly lastName?: string | null;

  readonly username?: string | null;

  @Expose({ name: 'language_code' })
  readonly languageCode: string;
}
