import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1771708058933 implements MigrationInterface {
    name = 'Migration1771708058933'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "last_name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "telegram_username" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "telegram_language_code" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "telegram_language_code" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "telegram_username" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "last_name" SET NOT NULL`);
    }

}
