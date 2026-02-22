import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1771611346192 implements MigrationInterface {
    name = 'InitialMigration1771611346192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "telegram_id" bigint NOT NULL, "telegram_username" character varying NOT NULL, "telegram_language_code" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
