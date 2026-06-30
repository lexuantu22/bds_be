import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddHashedRefreshToken1719460500000 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
