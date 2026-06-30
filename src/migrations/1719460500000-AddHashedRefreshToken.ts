import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddHashedRefreshToken1719460500000 implements MigrationInterface {
  name = 'AddHashedRefreshToken1719460500000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "hashedRefreshToken" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "hashedRefreshToken"`,
    );
  }
}
