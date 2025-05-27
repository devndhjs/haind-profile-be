import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchema1748331396125 implements MigrationInterface {
  name = 'InitSchema1748331396125';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sales" ("id" SERIAL NOT NULL, "sale_date" TIMESTAMP NOT NULL DEFAULT now(), "total_amount" numeric(12,2) NOT NULL, CONSTRAINT "PK_4f0bc990ae81dba46da680895ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sale_items" ("id" SERIAL NOT NULL, "sale_id" integer NOT NULL, "product_id" integer NOT NULL, "quantity" integer NOT NULL, "price_at_sale" numeric(10,2) NOT NULL, CONSTRAINT "PK_5a7dc5b4562a9e590528b3e08ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "sku" character varying, "quantity" integer NOT NULL DEFAULT '0', "price" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`
      CREATE TABLE "users" ("id" SERIAL PRIMARY KEY, "name" VARCHAR NOT NULL, "email" VARCHAR NOT NULL UNIQUE);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "sale_items"`);
    await queryRunner.query(`DROP TABLE "sales"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
