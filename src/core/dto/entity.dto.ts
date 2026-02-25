import { IsInt, IsString } from 'class-validator';
import { EntityType } from '../enum/entity-type.enum';

export class EntityDto {
  @IsInt()
  readonly offset: number;

  @IsInt()
  readonly length: number;

  @IsString()
  readonly type: EntityType;
}
