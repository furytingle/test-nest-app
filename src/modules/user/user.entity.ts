import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Point } from 'geojson';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', nullable: true })
  lastName?: string | null;

  @Column({ name: 'telegram_id', type: 'bigint' })
  telegramId: string;

  @Column({ name: 'telegram_username', type: 'varchar', nullable: true })
  telegramUsername?: string | null;

  @Column({ name: 'telegram_language_code', type: 'varchar', nullable: true })
  telegramLanguageCode?: string | null;

  @Column({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  location: Point | null;
}
