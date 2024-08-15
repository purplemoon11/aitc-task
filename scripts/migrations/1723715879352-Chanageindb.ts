import { MigrationInterface, QueryRunner } from "typeorm";

export class Chanageindb1723715879352 implements MigrationInterface {
    name = 'Chanageindb1723715879352'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_likes" ("id" SERIAL NOT NULL, "eventEventId" bigint, "userUserId" bigint, CONSTRAINT "PK_766a84015341ed59620e2542747" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Notifications" ("NotificationId" SERIAL NOT NULL, "Type" character varying(50) NOT NULL, "Message" text NOT NULL, "Read" boolean NOT NULL DEFAULT false, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userUserId" bigint, CONSTRAINT "PK_1cadd8789a1fd8a8c7b463e67f1" PRIMARY KEY ("NotificationId"))`);
        await queryRunner.query(`ALTER TABLE "user_likes" ADD CONSTRAINT "FK_307e80e8e0a46ec808ddeec96bc" FOREIGN KEY ("eventEventId") REFERENCES "Event"("EventId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_likes" ADD CONSTRAINT "FK_64d3db998c8040546a5af8f9ef1" FOREIGN KEY ("userUserId") REFERENCES "User"("UserId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Notifications" ADD CONSTRAINT "FK_2f8247063f508baf729646a5c21" FOREIGN KEY ("userUserId") REFERENCES "User"("UserId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Notifications" DROP CONSTRAINT "FK_2f8247063f508baf729646a5c21"`);
        await queryRunner.query(`ALTER TABLE "user_likes" DROP CONSTRAINT "FK_64d3db998c8040546a5af8f9ef1"`);
        await queryRunner.query(`ALTER TABLE "user_likes" DROP CONSTRAINT "FK_307e80e8e0a46ec808ddeec96bc"`);
        await queryRunner.query(`DROP TABLE "Notifications"`);
        await queryRunner.query(`DROP TABLE "user_likes"`);
    }

}
