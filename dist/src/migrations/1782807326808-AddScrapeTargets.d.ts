import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddScrapeTargets1782807326808 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
