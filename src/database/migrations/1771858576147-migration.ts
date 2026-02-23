import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1771858576147 implements MigrationInterface {
    name = 'Migration1771858576147'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "location" geography(Point,4326)`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "last_name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "telegram_username" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "telegram_language_code" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "telegram_language_code" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "telegram_username" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "last_name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`);
    }

}
