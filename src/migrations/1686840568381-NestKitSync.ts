import { MigrationInterface, QueryRunner } from "typeorm";

export class NestKitSync1686840568381 implements MigrationInterface {
    name = 'NestKitSync1686840568381'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "books" ("id" character varying NOT NULL, "title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "pk_books__id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "organizations" DROP COLUMN "addresses"`);
        await queryRunner.query(`ALTER TABLE "organizations" DROP COLUMN "phone_numbers"`);
        await queryRunner.query(`ALTER TABLE "organizations" DROP COLUMN "emails"`);
        await queryRunner.query(`ALTER TABLE "organizations" DROP COLUMN "websites"`);
        await queryRunner.query(`ALTER TABLE "organizations" DROP COLUMN "leaders"`);
        await queryRunner.query(`ALTER TABLE "organizations" DROP COLUMN "contact_persons"`);
        await queryRunner.query(`ALTER TABLE "organizations" DROP COLUMN "support_contacts"`);
        await queryRunner.query(`ALTER TABLE "organizations" DROP COLUMN "billing_contact"`);
        await queryRunner.query(`ALTER TABLE "organizations" DROP COLUMN "billing_address"`);
        await queryRunner.query(`ALTER TABLE "organizations" DROP COLUMN "other_contacts"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organizations" ADD "other_contacts" character varying`);
        await queryRunner.query(`ALTER TABLE "organizations" ADD "billing_address" jsonb`);
        await queryRunner.query(`ALTER TABLE "organizations" ADD "billing_contact" jsonb`);
        await queryRunner.query(`ALTER TABLE "organizations" ADD "support_contacts" jsonb`);
        await queryRunner.query(`ALTER TABLE "organizations" ADD "contact_persons" jsonb`);
        await queryRunner.query(`ALTER TABLE "organizations" ADD "leaders" jsonb`);
        await queryRunner.query(`ALTER TABLE "organizations" ADD "websites" jsonb`);
        await queryRunner.query(`ALTER TABLE "organizations" ADD "emails" jsonb`);
        await queryRunner.query(`ALTER TABLE "organizations" ADD "phone_numbers" jsonb`);
        await queryRunner.query(`ALTER TABLE "organizations" ADD "addresses" jsonb`);
        await queryRunner.query(`DROP TABLE "books"`);
    }

}
