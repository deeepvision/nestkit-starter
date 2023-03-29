import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1680088739923 implements MigrationInterface {
    name = 'Init1680088739923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "images" ("id" character varying NOT NULL, "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "typeorm_type" character varying NOT NULL, CONSTRAINT "pk_images__id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_images__typeorm_type" ON "images" ("typeorm_type") `);
        await queryRunner.query(`CREATE TABLE "image_renditions" ("id" character varying NOT NULL, "type" character varying NOT NULL, "location" jsonb NOT NULL, "meta" jsonb NOT NULL, "image_id" character varying NOT NULL, "typeorm_type" character varying NOT NULL, CONSTRAINT "pk_image_renditions__id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_image_id__type" ON "image_renditions" ("image_id", "type") `);
        await queryRunner.query(`CREATE INDEX "idx_image_renditions__typeorm_type" ON "image_renditions" ("typeorm_type") `);
        await queryRunner.query(`CREATE TYPE "public"."organization_groups_status_enum" AS ENUM('ACTIVE', 'DELETED')`);
        await queryRunner.query(`CREATE TABLE "organization_groups" ("id" character varying NOT NULL, "title" character varying NOT NULL, "code" character varying NOT NULL, "short_description" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP(3) WITH TIME ZONE, "logo_id" character varying, "creator_id" character varying, "status" "public"."organization_groups_status_enum" NOT NULL DEFAULT 'ACTIVE', "typeorm_type" character varying NOT NULL, CONSTRAINT "uq_organization_groups__code" UNIQUE ("code"), CONSTRAINT "REL_6a81c5ace9c769ba5ecb82fcaf" UNIQUE ("logo_id"), CONSTRAINT "pk_organization_groups__id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_organization_groups__typeorm_type" ON "organization_groups" ("typeorm_type") `);
        await queryRunner.query(`CREATE TABLE "organizations" ("id" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'ACTIVE', "title" character varying NOT NULL, "code" character varying NOT NULL, "locale" character varying NOT NULL DEFAULT 'en-US', "upload_region" character varying NOT NULL DEFAULT 'US', "embed_region" character varying NOT NULL DEFAULT 'DEFAULT', "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "modules" jsonb NOT NULL DEFAULT '["core"]', "updated_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP(3) WITH TIME ZONE, "logo_id" character varying, "creator_id" character varying, "timezone_name" character varying NOT NULL, "group_id" character varying NOT NULL, "addresses" jsonb, "phone_numbers" jsonb, "emails" jsonb, "websites" jsonb, "leaders" jsonb, "other_contacts" character varying, "welcome_text" character varying, "welcome_image_id" character varying, "typeorm_type" character varying NOT NULL, CONSTRAINT "uq_organizations__code__group_id" UNIQUE ("code", "group_id"), CONSTRAINT "REL_29ee692bd712423718ef4a04ca" UNIQUE ("logo_id"), CONSTRAINT "REL_6292eb535f2eb48740ccffade6" UNIQUE ("welcome_image_id"), CONSTRAINT "pk_organizations__id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_organizations__status" ON "organizations" ("status") `);
        await queryRunner.query(`CREATE INDEX "idx_organizations__typeorm_type" ON "organizations" ("typeorm_type") `);
        await queryRunner.query(`CREATE TYPE "public"."roles_type_enum" AS ENUM('SYSTEM', 'ORGANIZATION', 'BRAND', 'STUDIO', 'PASSPORT_TYPE', 'REVIEW')`);
        await queryRunner.query(`CREATE TYPE "public"."roles_status_enum" AS ENUM('ACTIVE', 'DELETED')`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" character varying NOT NULL, "type" "public"."roles_type_enum" NOT NULL, "title" character varying NOT NULL, "status" "public"."roles_status_enum" NOT NULL DEFAULT 'ACTIVE', "description" character varying, "permission_groups" jsonb NOT NULL DEFAULT '[]', "permissions" jsonb NOT NULL DEFAULT '[]', "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP(3) WITH TIME ZONE, "product_id" character varying, "organization_id" character varying, "typeorm_type" character varying NOT NULL, CONSTRAINT "pk_roles__id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_roles__status" ON "roles" ("status") `);
        await queryRunner.query(`CREATE INDEX "idx_roles__typeorm_type" ON "roles" ("typeorm_type") `);
        await queryRunner.query(`CREATE TABLE "user_to_role" ("id" character varying NOT NULL, "user_id" character varying NOT NULL, "organization_id" character varying, "role_id" character varying NOT NULL, "granted_by_id" character varying, "grant_at" TIMESTAMP(3) WITH TIME ZONE DEFAULT now(), "expire_at" TIMESTAMP(3) WITH TIME ZONE, "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "typeorm_type" character varying NOT NULL, CONSTRAINT "uq_user_to_role__user_id__organization_id__role_id" UNIQUE ("user_id", "organization_id", "role_id"), CONSTRAINT "pk_user_to_role__id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_user_to_role__user_id" ON "user_to_role" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "idx_user_to_role__role_id" ON "user_to_role" ("role_id") `);
        await queryRunner.query(`CREATE INDEX "idx_user_to_role__typeorm_type" ON "user_to_role" ("typeorm_type") `);
        await queryRunner.query(`CREATE TYPE "public"."users_status_enum" AS ENUM('ACTIVE', 'DISABLED', 'DELETED')`);
        await queryRunner.query(`CREATE TYPE "public"."users_invitation_status_enum" AS ENUM('PENDING', 'EMAIL_SENT', 'EMAIL_OPENED', 'LINK_OPENED', 'LOGGED_IN', 'DONE', 'ERROR')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" character varying NOT NULL, "type" character varying NOT NULL DEFAULT 'USER', "status" "public"."users_status_enum" NOT NULL DEFAULT 'ACTIVE', "invitation_status" "public"."users_invitation_status_enum" NOT NULL DEFAULT 'DONE', "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "phone_number" character varying, "avatar_url" character varying, "password_hash" character varying, "permissions" jsonb NOT NULL DEFAULT '[]', "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "last_seen" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP(3) WITH TIME ZONE, "locale" character varying, "timezone_name" character varying, "is_2fa_enabled" boolean, "is_otp_enabled" boolean, "otp_secret" character varying, "typeorm_type" character varying NOT NULL, CONSTRAINT "uq_users__email" UNIQUE ("email"), CONSTRAINT "pk_users__id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_users__status" ON "users" ("status") `);
        await queryRunner.query(`CREATE INDEX "idx_users__invitation_status" ON "users" ("invitation_status") `);
        await queryRunner.query(`CREATE INDEX "idx_users__typeorm_type" ON "users" ("typeorm_type") `);
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("id" character varying NOT NULL, "expires_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "audience" jsonb NOT NULL, "user_id" character varying NOT NULL, "typeorm_type" character varying NOT NULL, CONSTRAINT "pk_refresh_tokens__id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_refresh_tokens__typeorm_type" ON "refresh_tokens" ("typeorm_type") `);
        await queryRunner.query(`ALTER TABLE "image_renditions" ADD CONSTRAINT "fk_image_renditions__image_id" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "organization_groups" ADD CONSTRAINT "fk_organization_groups__logo_id" FOREIGN KEY ("logo_id") REFERENCES "images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "organization_groups" ADD CONSTRAINT "fk_organization_groups__creator_id" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "organizations" ADD CONSTRAINT "fk_organizations__logo_id" FOREIGN KEY ("logo_id") REFERENCES "images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "organizations" ADD CONSTRAINT "fk_organizations__creator_id" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "organizations" ADD CONSTRAINT "fk_organizations__group_id" FOREIGN KEY ("group_id") REFERENCES "organization_groups"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "organizations" ADD CONSTRAINT "fk_organizations__welcome_image_id" FOREIGN KEY ("welcome_image_id") REFERENCES "images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "fk_roles__organization_id" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_to_role" ADD CONSTRAINT "fk_user_to_role__user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_to_role" ADD CONSTRAINT "fk_user_to_role__organization_id" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_to_role" ADD CONSTRAINT "fk_user_to_role__role_id" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_to_role" ADD CONSTRAINT "fk_user_to_role__granted_by_id" FOREIGN KEY ("granted_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "fk_refresh_tokens__user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "fk_refresh_tokens__user_id"`);
        await queryRunner.query(`ALTER TABLE "user_to_role" DROP CONSTRAINT "fk_user_to_role__granted_by_id"`);
        await queryRunner.query(`ALTER TABLE "user_to_role" DROP CONSTRAINT "fk_user_to_role__role_id"`);
        await queryRunner.query(`ALTER TABLE "user_to_role" DROP CONSTRAINT "fk_user_to_role__organization_id"`);
        await queryRunner.query(`ALTER TABLE "user_to_role" DROP CONSTRAINT "fk_user_to_role__user_id"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "fk_roles__organization_id"`);
        await queryRunner.query(`ALTER TABLE "organizations" DROP CONSTRAINT "fk_organizations__welcome_image_id"`);
        await queryRunner.query(`ALTER TABLE "organizations" DROP CONSTRAINT "fk_organizations__group_id"`);
        await queryRunner.query(`ALTER TABLE "organizations" DROP CONSTRAINT "fk_organizations__creator_id"`);
        await queryRunner.query(`ALTER TABLE "organizations" DROP CONSTRAINT "fk_organizations__logo_id"`);
        await queryRunner.query(`ALTER TABLE "organization_groups" DROP CONSTRAINT "fk_organization_groups__creator_id"`);
        await queryRunner.query(`ALTER TABLE "organization_groups" DROP CONSTRAINT "fk_organization_groups__logo_id"`);
        await queryRunner.query(`ALTER TABLE "image_renditions" DROP CONSTRAINT "fk_image_renditions__image_id"`);
        await queryRunner.query(`DROP INDEX "public"."idx_refresh_tokens__typeorm_type"`);
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
        await queryRunner.query(`DROP INDEX "public"."idx_users__typeorm_type"`);
        await queryRunner.query(`DROP INDEX "public"."idx_users__invitation_status"`);
        await queryRunner.query(`DROP INDEX "public"."idx_users__status"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_invitation_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
        await queryRunner.query(`DROP INDEX "public"."idx_user_to_role__typeorm_type"`);
        await queryRunner.query(`DROP INDEX "public"."idx_user_to_role__role_id"`);
        await queryRunner.query(`DROP INDEX "public"."idx_user_to_role__user_id"`);
        await queryRunner.query(`DROP TABLE "user_to_role"`);
        await queryRunner.query(`DROP INDEX "public"."idx_roles__typeorm_type"`);
        await queryRunner.query(`DROP INDEX "public"."idx_roles__status"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TYPE "public"."roles_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."roles_type_enum"`);
        await queryRunner.query(`DROP INDEX "public"."idx_organizations__typeorm_type"`);
        await queryRunner.query(`DROP INDEX "public"."idx_organizations__status"`);
        await queryRunner.query(`DROP TABLE "organizations"`);
        await queryRunner.query(`DROP INDEX "public"."idx_organization_groups__typeorm_type"`);
        await queryRunner.query(`DROP TABLE "organization_groups"`);
        await queryRunner.query(`DROP TYPE "public"."organization_groups_status_enum"`);
        await queryRunner.query(`DROP INDEX "public"."idx_image_renditions__typeorm_type"`);
        await queryRunner.query(`DROP INDEX "public"."idx_image_id__type"`);
        await queryRunner.query(`DROP TABLE "image_renditions"`);
        await queryRunner.query(`DROP INDEX "public"."idx_images__typeorm_type"`);
        await queryRunner.query(`DROP TABLE "images"`);
    }

}
