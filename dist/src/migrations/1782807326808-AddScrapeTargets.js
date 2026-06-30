"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddScrapeTargets1782807326808 = void 0;
class AddScrapeTargets1782807326808 {
    name = 'AddScrapeTargets1782807326808';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "passwordHash" character varying NOT NULL, "hashedRefreshToken" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "real_estate_posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text NOT NULL, "price" numeric(12,2) NOT NULL, "area" numeric(10,2) NOT NULL, "location" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'available', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_601d7189d9d94d7ef48976bc9d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "system_settings" ("key" character varying NOT NULL, "value" character varying NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b1b5bc664526d375c94ce9ad43d" PRIMARY KEY ("key"))`);
        await queryRunner.query(`CREATE TABLE "scrape_targets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "platform" character varying NOT NULL DEFAULT 'google', "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_85a8c793895a163e7c80def1c58" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" ADD "description" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" ADD "status" character varying NOT NULL DEFAULT 'available'`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" ADD "link" text`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" ADD "content" text`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" ADD "rawData" jsonb`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" ADD "source" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" ADD "scrapedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" ADD "title" text`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" ADD "price" text`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" DROP COLUMN "area"`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" ADD "area" text`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" ADD "location" text`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "real_estate_posts" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" ADD "location" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" DROP COLUMN "area"`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" ADD "area" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" ADD "price" numeric(12,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" DROP COLUMN "scrapedAt"`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" DROP COLUMN "source"`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" DROP COLUMN "rawData"`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" DROP COLUMN "link"`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" ADD "status" character varying NOT NULL DEFAULT 'available'`);
        await queryRunner.query(`ALTER TABLE "real_estate_posts" ADD "description" text NOT NULL`);
        await queryRunner.query(`DROP TABLE "scrape_targets"`);
        await queryRunner.query(`DROP TABLE "system_settings"`);
        await queryRunner.query(`DROP TABLE "real_estate_posts"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
exports.AddScrapeTargets1782807326808 = AddScrapeTargets1782807326808;
//# sourceMappingURL=1782807326808-AddScrapeTargets.js.map