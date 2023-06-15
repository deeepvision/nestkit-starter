import { MigrationInterface, QueryRunner } from "typeorm";

export class NestKitSync1684786042947 implements MigrationInterface {
    name = 'NestKitSync1684786042947'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization_groups" ADD "features" jsonb NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "organizations" ADD "content_language" character varying NOT NULL DEFAULT 'en'`);
        await queryRunner.query(`ALTER TABLE "organizations" ADD "contact_persons" jsonb`);
        await queryRunner.query(`ALTER TABLE "organizations" ADD "support_contacts" jsonb`);
        await queryRunner.query(`ALTER TABLE "organizations" ADD "billing_contact" jsonb`);
        await queryRunner.query(`ALTER TABLE "organizations" ADD "billing_address" jsonb`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD "parent_user_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP COLUMN "parent_user_id"`);
        await queryRunner.query(`ALTER TABLE "organizations" DROP COLUMN "billing_address"`);
        await queryRunner.query(`ALTER TABLE "organizations" DROP COLUMN "billing_contact"`);
        await queryRunner.query(`ALTER TABLE "organizations" DROP COLUMN "support_contacts"`);
        await queryRunner.query(`ALTER TABLE "organizations" DROP COLUMN "contact_persons"`);
        await queryRunner.query(`ALTER TABLE "organizations" DROP COLUMN "content_language"`);
        await queryRunner.query(`ALTER TABLE "organization_groups" DROP COLUMN "features"`);
    }

}
