import { MigrationInterface, QueryRunner } from "typeorm";

export class LikeCommentOnEventMigrations1723548065368 implements MigrationInterface {
    name = 'LikeCommentOnEventMigrations1723548065368'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Event" DROP CONSTRAINT "fk_user"`);
        await queryRunner.query(`CREATE TABLE "Comment" ("CommentId" BIGSERIAL NOT NULL, "Content" text NOT NULL, "eventEventId" bigint, "userUserId" bigint, CONSTRAINT "PK_5b2b8300702b1820864d9dbb2d8" PRIMARY KEY ("CommentId"))`);
        await queryRunner.query(`ALTER TABLE "Event" DROP COLUMN "UserId"`);
        await queryRunner.query(`ALTER TABLE "Event" ADD "Likes" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "Event" ADD "userUserId" bigint`);
        await queryRunner.query(`ALTER TABLE "Event" ADD CONSTRAINT "FK_18e2db8b6e5bd33397beac50463" FOREIGN KEY ("userUserId") REFERENCES "User"("UserId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Comment" ADD CONSTRAINT "FK_36f8109720c967101436df55dd9" FOREIGN KEY ("eventEventId") REFERENCES "Event"("EventId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Comment" ADD CONSTRAINT "FK_b0b95a2191b8114ca398eb8fe1a" FOREIGN KEY ("userUserId") REFERENCES "User"("UserId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Comment" DROP CONSTRAINT "FK_b0b95a2191b8114ca398eb8fe1a"`);
        await queryRunner.query(`ALTER TABLE "Comment" DROP CONSTRAINT "FK_36f8109720c967101436df55dd9"`);
        await queryRunner.query(`ALTER TABLE "Event" DROP CONSTRAINT "FK_18e2db8b6e5bd33397beac50463"`);
        await queryRunner.query(`ALTER TABLE "Event" DROP COLUMN "userUserId"`);
        await queryRunner.query(`ALTER TABLE "Event" DROP COLUMN "Likes"`);
        await queryRunner.query(`ALTER TABLE "Event" ADD "UserId" bigint`);
        await queryRunner.query(`DROP TABLE "Comment"`);
        await queryRunner.query(`ALTER TABLE "Event" ADD CONSTRAINT "fk_user" FOREIGN KEY ("UserId") REFERENCES "User"("UserId") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
