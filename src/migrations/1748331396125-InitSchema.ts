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

    await queryRunner.query(`
      INSERT INTO "products" (name, sku, quantity, price) VALUES
      ('Keyboard', 'KB001', 150, 49.99),
      ('Mouse', 'MS001', 200, 29.90),
      ('Monitor', 'MN001', 50, 199.99),
      ('USB Cable', 'USB001', 500, 5.99),
      ('Laptop Stand', 'LS001', 100, 39.99);
    `);

    // Insert sample sales + sale_items
    await queryRunner.query(`
      INSERT INTO "sales" (sale_date, total_amount) VALUES
      ('2024-01-01 10:00:00', 99.98),
      ('2024-01-02 11:00:00', 59.80),
      ('2024-01-03 14:30:00', 199.99),
      ('2024-01-04 09:45:00', 5.99),
      ('2024-01-05 13:15:00', 89.89),
      ('2024-01-06 16:00:00', 39.99),
      ('2024-01-07 08:30:00', 49.99),
      ('2024-01-08 18:20:00', 29.90),
      ('2024-01-09 20:10:00', 10.00),
      ('2024-01-10 21:45:00', 199.99);
    `);

    await queryRunner.query(`
      INSERT INTO "sale_items" (sale_id, product_id, quantity, price_at_sale) VALUES
      (1, 1, 2, 49.99),
      (2, 2, 2, 29.90),
      (3, 3, 1, 199.99),
      (4, 4, 1, 5.99),
      (5, 1, 1, 49.99),
      (5, 2, 1, 29.90),
      (6, 5, 1, 39.99),
      (7, 1, 1, 49.99),
      (8, 2, 1, 29.90),
      (9, 4, 2, 5.00),
      (10, 3, 1, 199.99);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "sale_items"`);
    await queryRunner.query(`DROP TABLE "sales"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
