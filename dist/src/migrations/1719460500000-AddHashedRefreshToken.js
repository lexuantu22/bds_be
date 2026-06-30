"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddHashedRefreshToken1719460500000 = void 0;
class AddHashedRefreshToken1719460500000 {
    name = 'AddHashedRefreshToken1719460500000';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "hashedRefreshToken" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "hashedRefreshToken"`);
    }
}
exports.AddHashedRefreshToken1719460500000 = AddHashedRefreshToken1719460500000;
//# sourceMappingURL=1719460500000-AddHashedRefreshToken.js.map