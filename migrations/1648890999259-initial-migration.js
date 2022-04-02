const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialMigration1648890999259 {
    name = 'initialMigration1648890999259'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."seat_class_type_enum" AS ENUM('first', 'business', 'economy')`);
        await queryRunner.query(`CREATE TABLE "seat" ("id" SERIAL NOT NULL, "seat_number" character varying(20) NOT NULL, "is_available" boolean NOT NULL DEFAULT true, "class_type" "public"."seat_class_type_enum" NOT NULL DEFAULT 'economy', "flightId" integer, CONSTRAINT "UQ_08df4a27cc1bd46f6b0ce1d4303" UNIQUE ("seat_number", "flightId"), CONSTRAINT "PK_4e72ae40c3fbd7711ccb380ac17" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "flight" ("id" SERIAL NOT NULL, "airline" character varying(200) NOT NULL, "flight_number" character varying(200) NOT NULL, "capacity" integer NOT NULL, "origin" character varying(200) NOT NULL, "destination" character varying(200) NOT NULL, "origin_airport_name" character varying(200) NOT NULL, "destination_airport_name" character varying(200) NOT NULL, "departure_time" TIME NOT NULL, "arrival_time" TIME NOT NULL, "departure_date" date NOT NULL, "arrival_date" date NOT NULL, "refundable" boolean NOT NULL DEFAULT false, "company_logo" character varying NOT NULL, "description" character varying(1000) NOT NULL, "seat_base_price" numeric NOT NULL, "seat_price_business_class" numeric NOT NULL, "seat_price_first_class" numeric NOT NULL, CONSTRAINT "PK_bf571ce6731cf071fc51b94df03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('sysadmin', 'customer')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "first_name" character varying(200) NOT NULL, "last_name" character varying(200) NOT NULL, "email" character varying(200) NOT NULL, "password" character varying(200) NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'customer', "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "is_email_verified" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "seat" ADD CONSTRAINT "FK_5298809d13db3c04e6bf460e207" FOREIGN KEY ("flightId") REFERENCES "flight"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "seat" DROP CONSTRAINT "FK_5298809d13db3c04e6bf460e207"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "flight"`);
        await queryRunner.query(`DROP TABLE "seat"`);
        await queryRunner.query(`DROP TYPE "public"."seat_class_type_enum"`);
    }
}
