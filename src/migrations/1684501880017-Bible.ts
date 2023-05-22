import { MigrationInterface, QueryRunner } from 'typeorm';

export class Bible1684501880017 implements MigrationInterface {
    name = 'Bible1684501880017';

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`CREATE TABLE "bibles" ("id" character varying NOT NULL, "title" character varying NOT NULL, "copyright" character varying NOT NULL, CONSTRAINT "pk_bibles__id" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "bible_books" ("id" character varying NOT NULL, "title" character varying NOT NULL, "short_title" character varying NOT NULL, "book_number" integer NOT NULL, "bible_id" character varying NOT NULL, CONSTRAINT "pk_bible_books__id" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "bible_verses" ("id" character varying NOT NULL, "text" text NOT NULL, "chapter" integer NOT NULL, "verse_number" integer NOT NULL, "bible_book_id" character varying NOT NULL, "bible_id" character varying NOT NULL, CONSTRAINT "pk_bible_verses__id" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "bible_stories" ("id" character varying NOT NULL, "title" character varying NOT NULL, "chapter" integer NOT NULL, "verse" integer NOT NULL, "order_if_several" integer NOT NULL, "bible_book_id" character varying NOT NULL, "bible_id" character varying NOT NULL, CONSTRAINT "pk_bible_stories__id" PRIMARY KEY ("id"))`);
      await queryRunner.query(`ALTER TABLE "bible_books" ADD CONSTRAINT "fk_bible_books__bible_id" FOREIGN KEY ("bible_id") REFERENCES "bibles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "bible_verses" ADD CONSTRAINT "fk_bible_verses__bible_book_id" FOREIGN KEY ("bible_book_id") REFERENCES "bible_books"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "bible_verses" ADD CONSTRAINT "fk_bible_verses__bible_id" FOREIGN KEY ("bible_id") REFERENCES "bibles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "bible_stories" ADD CONSTRAINT "fk_bible_stories__bible_book_id" FOREIGN KEY ("bible_book_id") REFERENCES "bible_books"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "bible_stories" ADD CONSTRAINT "fk_bible_stories__bible_id" FOREIGN KEY ("bible_id") REFERENCES "bibles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);

      await queryRunner.query(`CREATE TYPE "public"."bibles_language_enum" AS ENUM('RU', 'EN')`);
      await queryRunner.query(`ALTER TABLE "bibles" ADD "language" "public"."bibles_language_enum" NOT NULL`);
      await queryRunner.query(`CREATE TYPE "public"."bible_books_language_enum" AS ENUM('RU', 'EN')`);
      await queryRunner.query(`ALTER TABLE "bible_books" ADD "language" "public"."bible_books_language_enum" NOT NULL`);
      await queryRunner.query(`CREATE TYPE "public"."bible_verses_language_enum" AS ENUM('RU', 'EN')`);
      await queryRunner.query(`ALTER TABLE "bible_verses" ADD "language" "public"."bible_verses_language_enum" NOT NULL`);
      await queryRunner.query(`CREATE TYPE "public"."bible_stories_language_enum" AS ENUM('RU', 'EN')`);
      await queryRunner.query(`ALTER TABLE "bible_stories" ADD "language" "public"."bible_stories_language_enum" NOT NULL`);

      await queryRunner.query(`CREATE INDEX "idx_bible_verses__bible_book_id__chapter" ON "bible_verses" ("bible_book_id", "chapter") `);
      await queryRunner.query(`CREATE INDEX "idx_bible_stories__bible_book_id__chapter" ON "bible_stories" ("bible_book_id", "chapter") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DROP INDEX "public"."idx_bible_stories__bible_book_id__chapter"`);
      await queryRunner.query(`DROP INDEX "public"."idx_bible_verses__bible_book_id__chapter"`);

      await queryRunner.query(`ALTER TABLE "bible_stories" DROP COLUMN "language"`);
      await queryRunner.query(`DROP TYPE "public"."bible_stories_language_enum"`);
      await queryRunner.query(`ALTER TABLE "bible_verses" DROP COLUMN "language"`);
      await queryRunner.query(`DROP TYPE "public"."bible_verses_language_enum"`);
      await queryRunner.query(`ALTER TABLE "bible_books" DROP COLUMN "language"`);
      await queryRunner.query(`DROP TYPE "public"."bible_books_language_enum"`);
      await queryRunner.query(`ALTER TABLE "bibles" DROP COLUMN "language"`);
      await queryRunner.query(`DROP TYPE "public"."bibles_language_enum"`);

      await queryRunner.query(`ALTER TABLE "bible_stories" DROP CONSTRAINT "fk_bible_stories__bible_id"`);
      await queryRunner.query(`ALTER TABLE "bible_stories" DROP CONSTRAINT "fk_bible_stories__bible_book_id"`);
      await queryRunner.query(`ALTER TABLE "bible_verses" DROP CONSTRAINT "fk_bible_verses__bible_id"`);
      await queryRunner.query(`ALTER TABLE "bible_verses" DROP CONSTRAINT "fk_bible_verses__bible_book_id"`);
      await queryRunner.query(`ALTER TABLE "bible_books" DROP CONSTRAINT "fk_bible_books__bible_id"`);
      await queryRunner.query(`DROP TABLE "bible_stories"`);
      await queryRunner.query(`DROP TABLE "bible_verses"`);
      await queryRunner.query(`DROP TABLE "bible_books"`);
      await queryRunner.query(`DROP TABLE "bibles"`);
    }
}
