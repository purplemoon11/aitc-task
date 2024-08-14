import { MigrationInterface, QueryRunner } from "typeorm";

export class FollowEntity1723625245325 implements MigrationInterface {
    name = 'FollowEntity1723625245325'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "follow" ("id" SERIAL NOT NULL, "followingUserId" bigint, "followerUserId" bigint, CONSTRAINT "PK_fda88bc28a84d2d6d06e19df6e5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "follow" ADD CONSTRAINT "FK_a46b5b444603dfa4e356d8721b6" FOREIGN KEY ("followingUserId") REFERENCES "User"("UserId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow" ADD CONSTRAINT "FK_673eb90803096b4300d2f547a4c" FOREIGN KEY ("followerUserId") REFERENCES "User"("UserId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follow" DROP CONSTRAINT "FK_673eb90803096b4300d2f547a4c"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP CONSTRAINT "FK_a46b5b444603dfa4e356d8721b6"`);
        await queryRunner.query(`DROP TABLE "follow"`);
    }

}
