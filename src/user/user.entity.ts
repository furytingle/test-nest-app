import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
