import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1789869126927 implements MigrationInterface {
    name = 'InitialSchema1789869126927'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_entity_role_enum" AS ENUM('USER', 'ADMIN')`);
        await queryRunner.query(`CREATE TYPE "public"."user_entity_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'PENDING_DELETION')`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."user_entity_role_enum" NOT NULL DEFAULT 'USER', "status" "public"."user_entity_status_enum" NOT NULL DEFAULT 'ACTIVE', "refreshTokenHash" character varying, "deletionScheduledAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "UQ_9b998bada7cff93fcb953b0c37e" UNIQUE ("username"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."transaction_entity_type_enum" AS ENUM('INCOME', 'EXPENSE')`);
        await queryRunner.query(`CREATE TABLE "transaction_entity" ("id" SERIAL NOT NULL, "amount" numeric(12,2) NOT NULL, "type" "public"."transaction_entity_type_enum" NOT NULL, "description" character varying NOT NULL, "date" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "categoryId" integer, CONSTRAINT "PK_6f9d7f02d8835ac9ef1f685a2e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "UQ_40620b7120aac658d61b37cb78f" UNIQUE ("userId", "name"), CONSTRAINT "PK_1a38b9007ed8afab85026703a53" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transaction_entity" ADD CONSTRAINT "FK_d6703c8f1c01fde6ed20abb26eb" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction_entity" ADD CONSTRAINT "FK_ed44524e7e60f910e6d5f419eee" FOREIGN KEY ("categoryId") REFERENCES "category_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category_entity" ADD CONSTRAINT "FK_a73f39c8a6b5ff9254cf970ec79" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category_entity" DROP CONSTRAINT "FK_a73f39c8a6b5ff9254cf970ec79"`);
        await queryRunner.query(`ALTER TABLE "transaction_entity" DROP CONSTRAINT "FK_ed44524e7e60f910e6d5f419eee"`);
        await queryRunner.query(`ALTER TABLE "transaction_entity" DROP CONSTRAINT "FK_d6703c8f1c01fde6ed20abb26eb"`);
        await queryRunner.query(`DROP TABLE "category_entity"`);
        await queryRunner.query(`DROP TABLE "transaction_entity"`);
        await queryRunner.query(`DROP TYPE "public"."transaction_entity_type_enum"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TYPE "public"."user_entity_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_entity_role_enum"`);
    }

}
