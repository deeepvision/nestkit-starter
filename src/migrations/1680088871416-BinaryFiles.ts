import { MigrationInterface, QueryRunner } from "typeorm";

export class BinaryFiles1680088871416 implements MigrationInterface {
    name = 'BinaryFiles1680088871416'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "files" ("id" character varying NOT NULL, "location" jsonb NOT NULL, "meta" jsonb NOT NULL, "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP(3) WITH TIME ZONE, "typeorm_type" character varying NOT NULL, CONSTRAINT "pk_files__id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_files__typeorm_type" ON "files" ("typeorm_type") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_files__typeorm_type"`);
        await queryRunner.query(`DROP TABLE "files"`);
    }

}
