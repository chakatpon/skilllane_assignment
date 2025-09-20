import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedAdminUser1695225602000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
  INSERT INTO "user" (username, password, role)
  VALUES ('admin', '$2b$10$84FouMV.ZmzyhrLikna0QeJXypL5S5gSAATy4pnYnMynBPQtUIJcq', 'admin')
  ON CONFLICT (username) DO NOTHING;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "user" WHERE username = 'admin';
    `);
  }
}
