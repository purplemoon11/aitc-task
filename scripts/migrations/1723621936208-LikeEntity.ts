import { MigrationInterface, QueryRunner } from "typeorm";

export class LikeEntity1723621936208 implements MigrationInterface {
    name = 'LikeEntity1723621936208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "UserLikes" ("UserId" bigint NOT NULL, "EventId" bigint NOT NULL, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userUserId" bigint, "eventEventId" bigint, CONSTRAINT "PK_08b413b58d7cdca37d83fddb73c" PRIMARY KEY ("UserId", "EventId"))`);
        await queryRunner.query(`CREATE TABLE "UserFollowers" ("userId" bigint NOT NULL, "followerId" bigint NOT NULL, CONSTRAINT "PK_275ecf3c53ed13bbf0bb1052af5" PRIMARY KEY ("userId", "followerId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_466eb9236b59cc494e525f69eb" ON "UserFollowers" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5c520a3e483cf04fcd5201e07c" ON "UserFollowers" ("followerId") `);
        await queryRunner.query(`ALTER TABLE "UserLikes" ADD CONSTRAINT "FK_5894dc4f6f653ca41d8236ec0f3" FOREIGN KEY ("userUserId") REFERENCES "User"("UserId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserLikes" ADD CONSTRAINT "FK_719e44fdcd4513e2ad93724fa1d" FOREIGN KEY ("eventEventId") REFERENCES "Event"("EventId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserFollowers" ADD CONSTRAINT "FK_466eb9236b59cc494e525f69eb5" FOREIGN KEY ("userId") REFERENCES "User"("UserId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "UserFollowers" ADD CONSTRAINT "FK_5c520a3e483cf04fcd5201e07ca" FOREIGN KEY ("followerId") REFERENCES "User"("UserId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserFollowers" DROP CONSTRAINT "FK_5c520a3e483cf04fcd5201e07ca"`);
        await queryRunner.query(`ALTER TABLE "UserFollowers" DROP CONSTRAINT "FK_466eb9236b59cc494e525f69eb5"`);
        await queryRunner.query(`ALTER TABLE "UserLikes" DROP CONSTRAINT "FK_719e44fdcd4513e2ad93724fa1d"`);
        await queryRunner.query(`ALTER TABLE "UserLikes" DROP CONSTRAINT "FK_5894dc4f6f653ca41d8236ec0f3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5c520a3e483cf04fcd5201e07c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_466eb9236b59cc494e525f69eb"`);
        await queryRunner.query(`DROP TABLE "UserFollowers"`);
        await queryRunner.query(`DROP TABLE "UserLikes"`);
    }

}
