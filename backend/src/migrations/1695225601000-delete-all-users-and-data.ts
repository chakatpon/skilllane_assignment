import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteAllUsersAndData1695225601000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE "user" CASCADE;`);
    await queryRunner.query(`TRUNCATE TABLE "book" CASCADE;`);
    await queryRunner.query(`TRUNCATE TABLE "borrow" CASCADE;`);
    // Add more tables as needed
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // No-op
  }
}
