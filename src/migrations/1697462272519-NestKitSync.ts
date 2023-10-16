import { MigrationInterface, QueryRunner } from "typeorm";

export class NestKitSync1697462272519 implements MigrationInterface {
    name = 'NestKitSync1697462272519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "password_recovery_requests" ("id" character varying NOT NULL, "email" character varying NOT NULL, "token" character varying NOT NULL, "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "uq_password_recovery_requests__email" UNIQUE ("email"), CONSTRAINT "pk_password_recovery_requests__id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "client_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "client_id"`);
        await queryRunner.query(`DROP TABLE "password_recovery_requests"`);
    }

}
