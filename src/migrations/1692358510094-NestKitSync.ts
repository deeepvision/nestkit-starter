import { MigrationInterface, QueryRunner } from "typeorm";

export class NestKitSync1692358510094 implements MigrationInterface {
    name = 'NestKitSync1692358510094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organizations" RENAME COLUMN "content_language" TO "content_languages"`);
        await queryRunner.query(`CREATE TABLE "service_tokens" ("id" character varying NOT NULL, "name" character varying NOT NULL, "expires_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "service_account_id" character varying NOT NULL, "typeorm_type" character varying NOT NULL, CONSTRAINT "pk_service_tokens__id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_service_tokens__typeorm_type" ON "service_tokens" ("typeorm_type") `);
        await queryRunner.query(`ALTER TABLE "image_renditions" ADD "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "organizations" DROP COLUMN "content_languages"`);
        await queryRunner.query(`ALTER TABLE "organizations" ADD "content_languages" jsonb NOT NULL DEFAULT '["en"]'`);
        await queryRunner.query(`ALTER TABLE "service_tokens" ADD CONSTRAINT "fk_service_tokens__service_account_id" FOREIGN KEY ("service_account_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_tokens" DROP CONSTRAINT "fk_service_tokens__service_account_id"`);
        await queryRunner.query(`ALTER TABLE "organizations" DROP COLUMN "content_languages"`);
        await queryRunner.query(`ALTER TABLE "organizations" ADD "content_languages" character varying NOT NULL DEFAULT 'en'`);
        await queryRunner.query(`ALTER TABLE "image_renditions" DROP COLUMN "created_at"`);
        await queryRunner.query(`DROP INDEX "public"."idx_service_tokens__typeorm_type"`);
        await queryRunner.query(`DROP TABLE "service_tokens"`);
        await queryRunner.query(`ALTER TABLE "organizations" RENAME COLUMN "content_languages" TO "content_language"`);
    }

}
