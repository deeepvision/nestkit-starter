import { MigrationInterface, QueryRunner } from "typeorm";

export class NestKitSync1710082332863 implements MigrationInterface {
    name = 'NestKitSync1710082332863'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_roles__status"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."roles_status_enum"`);
        await queryRunner.query(`ALTER TABLE "user_to_role" ADD "organization_group_id" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "referrer" character varying`);
        await queryRunner.query(`ALTER TYPE "public"."roles_type_enum" RENAME TO "roles_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."roles_type_enum" AS ENUM('SYSTEM', 'ORGANIZATION', 'BRAND', 'STUDIO', 'PASSPORT_TYPE', 'REVIEW', 'ORGANIZATION_GROUP')`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "type" TYPE "public"."roles_type_enum" USING "type"::"text"::"public"."roles_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."roles_type_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."users_status_enum" RENAME TO "users_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."users_status_enum" AS ENUM('WAITING_FOR_APPROVAL', 'WAITING_FOR_SIGNUP', 'ACTIVE', 'DISABLED', 'DELETED')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" TYPE "public"."users_status_enum" USING "status"::"text"::"public"."users_status_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'`);
        await queryRunner.query(`DROP TYPE "public"."users_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user_to_role" ADD CONSTRAINT "uq_user_to_role__user_id__organization_group_id__role_id" UNIQUE ("user_id", "organization_group_id", "role_id")`);
        await queryRunner.query(`ALTER TABLE "user_to_role" ADD CONSTRAINT "fk_user_to_role__organization_group_id" FOREIGN KEY ("organization_group_id") REFERENCES "organization_groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_to_role" DROP CONSTRAINT "fk_user_to_role__organization_group_id"`);
        await queryRunner.query(`ALTER TABLE "user_to_role" DROP CONSTRAINT "uq_user_to_role__user_id__organization_group_id__role_id"`);
        await queryRunner.query(`CREATE TYPE "public"."users_status_enum_old" AS ENUM('ACTIVE', 'DISABLED', 'DELETED')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" TYPE "public"."users_status_enum_old" USING "status"::"text"::"public"."users_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'`);
        await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."users_status_enum_old" RENAME TO "users_status_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."roles_type_enum_old" AS ENUM('SYSTEM', 'ORGANIZATION', 'BRAND', 'STUDIO', 'PASSPORT_TYPE', 'REVIEW')`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "type" TYPE "public"."roles_type_enum_old" USING "type"::"text"::"public"."roles_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."roles_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."roles_type_enum_old" RENAME TO "roles_type_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "referrer"`);
        await queryRunner.query(`ALTER TABLE "user_to_role" DROP COLUMN "organization_group_id"`);
        await queryRunner.query(`CREATE TYPE "public"."roles_status_enum" AS ENUM('ACTIVE', 'DELETED')`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "status" "public"."roles_status_enum" NOT NULL DEFAULT 'ACTIVE'`);
        await queryRunner.query(`CREATE INDEX "idx_roles__status" ON "roles" ("status") `);
    }

}
