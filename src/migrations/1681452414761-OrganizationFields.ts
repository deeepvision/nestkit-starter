import { MigrationInterface, QueryRunner } from "typeorm";

export class OrganizationFields1681452414761 implements MigrationInterface {
    name = 'OrganizationFields1681452414761'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "invitation_status_changes" ("id" character varying NOT NULL, "from" character varying NOT NULL, "to" character varying NOT NULL, "changed_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" character varying NOT NULL, CONSTRAINT "pk_invitation_status_changes__id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "organizations" ADD "features" jsonb NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "invitation_status_changes" ADD CONSTRAINT "fk_invitation_status_changes__user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invitation_status_changes" DROP CONSTRAINT "fk_invitation_status_changes__user_id"`);
        await queryRunner.query(`ALTER TABLE "organizations" DROP COLUMN "features"`);
        await queryRunner.query(`DROP TABLE "invitation_status_changes"`);
    }

}
