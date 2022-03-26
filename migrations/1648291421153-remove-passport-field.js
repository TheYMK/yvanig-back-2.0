const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class removePassportField1648291421153 {
    name = 'removePassportField1648291421153'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "passport_number"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD "passport_number" character varying NOT NULL`);
    }
}
