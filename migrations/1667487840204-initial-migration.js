const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialMigration1667487840204 {
    name = 'initialMigration1667487840204'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "blog_tag" ("id" SERIAL NOT NULL, "name" character varying(200) NOT NULL, CONSTRAINT "UQ_99f9eeb691176c72b50c16bc614" UNIQUE ("name"), CONSTRAINT "PK_e4abd1ac56d0cfd86bd57c87a06" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blog" ("id" SERIAL NOT NULL, "image_url" character varying(200) NOT NULL DEFAULT 'https://images.pexels.com/photos/4458/cup-mug-desk-office.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', "content" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_85c6532ad065a448e9de7638571" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blog_category" ("id" SERIAL NOT NULL, "name" character varying(200) NOT NULL, CONSTRAINT "UQ_65635c7b92edf9f74563790325b" UNIQUE ("name"), CONSTRAINT "PK_32b67ddf344608b5c2fb95bc90c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."seat_class_type_enum" AS ENUM('first', 'business', 'economy')`);
        await queryRunner.query(`CREATE TABLE "seat" ("id" SERIAL NOT NULL, "seat_number" character varying(20) NOT NULL, "is_available" boolean NOT NULL DEFAULT true, "class_type" "public"."seat_class_type_enum" NOT NULL DEFAULT 'economy', "flightId" integer, CONSTRAINT "UQ_08df4a27cc1bd46f6b0ce1d4303" UNIQUE ("seat_number", "flightId"), CONSTRAINT "PK_4e72ae40c3fbd7711ccb380ac17" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."flight_status_enum" AS ENUM('scheduled', 'delayed', 'in_air', 'expected', 'diverted', 'recovery', 'landed', 'arrived', 'cancelled', 'no_takeoff_info', 'past_flight')`);
        await queryRunner.query(`CREATE TABLE "flight" ("id" SERIAL NOT NULL, "airline" character varying(200) NOT NULL, "flight_number" character varying(200) NOT NULL, "origin_airport_code" character varying(20) NOT NULL, "destination_airport_code" character varying(20) NOT NULL, "capacity" integer NOT NULL, "origin" character varying(200) NOT NULL, "destination" character varying(200) NOT NULL, "origin_airport_name" character varying(200) NOT NULL, "destination_airport_name" character varying(200) NOT NULL, "departure_time" TIME NOT NULL, "arrival_time" TIME NOT NULL, "departure_date" date NOT NULL, "arrival_date" date NOT NULL, "refundable" boolean NOT NULL DEFAULT false, "company_logo" character varying NOT NULL, "description" character varying(1000) NOT NULL, "seat_base_price" numeric NOT NULL, "seat_price_business_class" numeric NOT NULL, "seat_price_first_class" numeric NOT NULL, "status" "public"."flight_status_enum" NOT NULL DEFAULT 'scheduled', "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_bf571ce6731cf071fc51b94df03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('sysadmin', 'customer')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "first_name" character varying(200) NOT NULL, "last_name" character varying(200) NOT NULL, "email" character varying(200) NOT NULL, "password" character varying(200) NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'customer', "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "is_email_verified" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."passenger_document_type_enum" AS ENUM('passport', 'id_card')`);
        await queryRunner.query(`CREATE TYPE "public"."passenger_gender_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`CREATE TABLE "passenger" ("id" SERIAL NOT NULL, "document_type" "public"."passenger_document_type_enum" NOT NULL DEFAULT 'passport', "document_number" character varying(200) NOT NULL, "phone_number" character varying(200) NOT NULL, "date_of_birth" date NOT NULL, "gender" "public"."passenger_gender_enum" NOT NULL, "userId" integer, CONSTRAINT "UQ_7b76ef33400ad900b1ff15330db" UNIQUE ("phone_number"), CONSTRAINT "UQ_d6ed5e441e208af2735390adb06" UNIQUE ("userId"), CONSTRAINT "REL_d6ed5e441e208af2735390adb0" UNIQUE ("userId"), CONSTRAINT "PK_50e940dd2c126adc20205e83fac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."booking_booking_type_enum" AS ENUM('flight', 'hotel', 'restaurant')`);
        await queryRunner.query(`CREATE TYPE "public"."booking_payment_method_enum" AS ENUM('bank_card', 'moneygram', 'western_union', 'paypal')`);
        await queryRunner.query(`CREATE TYPE "public"."booking_status_enum" AS ENUM('confirmed', 'cancelled', 'pending')`);
        await queryRunner.query(`CREATE TABLE "booking" ("id" SERIAL NOT NULL, "booking_type" "public"."booking_booking_type_enum" NOT NULL, "payment_method" "public"."booking_payment_method_enum" NOT NULL, "price" numeric NOT NULL, "status" "public"."booking_status_enum" NOT NULL DEFAULT 'pending', "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "flightId" integer, "seatId" integer, "passengerId" integer, CONSTRAINT "UQ_56a14c76ca373911daae6438e78" UNIQUE ("passengerId", "flightId"), CONSTRAINT "REL_ddc6d1d556f155406b4788d9e9" UNIQUE ("seatId"), CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blog_blog_categories_blog_category" ("blogId" integer NOT NULL, "blogCategoryId" integer NOT NULL, CONSTRAINT "PK_1c236b33e736dddc4b2bbb4f361" PRIMARY KEY ("blogId", "blogCategoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_95351ae63e52f79bce5dac753b" ON "blog_blog_categories_blog_category" ("blogId") `);
        await queryRunner.query(`CREATE INDEX "IDX_da48a2ef33d42cb4734f3825d9" ON "blog_blog_categories_blog_category" ("blogCategoryId") `);
        await queryRunner.query(`CREATE TABLE "blog_blog_tags_blog_tag" ("blogId" integer NOT NULL, "blogTagId" integer NOT NULL, CONSTRAINT "PK_3d2d2cf88bc03c1f2ddf78ba3ab" PRIMARY KEY ("blogId", "blogTagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e46f6d2f6f64bcc2ca73062ac1" ON "blog_blog_tags_blog_tag" ("blogId") `);
        await queryRunner.query(`CREATE INDEX "IDX_170816682849f8891ab6c5d829" ON "blog_blog_tags_blog_tag" ("blogTagId") `);
        await queryRunner.query(`ALTER TABLE "seat" ADD CONSTRAINT "FK_5298809d13db3c04e6bf460e207" FOREIGN KEY ("flightId") REFERENCES "flight"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "passenger" ADD CONSTRAINT "FK_d6ed5e441e208af2735390adb06" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_cc8ec8fa07ca411f70625d36f87" FOREIGN KEY ("flightId") REFERENCES "flight"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_ddc6d1d556f155406b4788d9e97" FOREIGN KEY ("seatId") REFERENCES "seat"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_690e3cf53f5101c59b242095b2b" FOREIGN KEY ("passengerId") REFERENCES "passenger"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog_blog_categories_blog_category" ADD CONSTRAINT "FK_95351ae63e52f79bce5dac753bb" FOREIGN KEY ("blogId") REFERENCES "blog"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "blog_blog_categories_blog_category" ADD CONSTRAINT "FK_da48a2ef33d42cb4734f3825d9c" FOREIGN KEY ("blogCategoryId") REFERENCES "blog_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog_blog_tags_blog_tag" ADD CONSTRAINT "FK_e46f6d2f6f64bcc2ca73062ac16" FOREIGN KEY ("blogId") REFERENCES "blog"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "blog_blog_tags_blog_tag" ADD CONSTRAINT "FK_170816682849f8891ab6c5d829c" FOREIGN KEY ("blogTagId") REFERENCES "blog_tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "blog_blog_tags_blog_tag" DROP CONSTRAINT "FK_170816682849f8891ab6c5d829c"`);
        await queryRunner.query(`ALTER TABLE "blog_blog_tags_blog_tag" DROP CONSTRAINT "FK_e46f6d2f6f64bcc2ca73062ac16"`);
        await queryRunner.query(`ALTER TABLE "blog_blog_categories_blog_category" DROP CONSTRAINT "FK_da48a2ef33d42cb4734f3825d9c"`);
        await queryRunner.query(`ALTER TABLE "blog_blog_categories_blog_category" DROP CONSTRAINT "FK_95351ae63e52f79bce5dac753bb"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_690e3cf53f5101c59b242095b2b"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_ddc6d1d556f155406b4788d9e97"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_cc8ec8fa07ca411f70625d36f87"`);
        await queryRunner.query(`ALTER TABLE "passenger" DROP CONSTRAINT "FK_d6ed5e441e208af2735390adb06"`);
        await queryRunner.query(`ALTER TABLE "seat" DROP CONSTRAINT "FK_5298809d13db3c04e6bf460e207"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_170816682849f8891ab6c5d829"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e46f6d2f6f64bcc2ca73062ac1"`);
        await queryRunner.query(`DROP TABLE "blog_blog_tags_blog_tag"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_da48a2ef33d42cb4734f3825d9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_95351ae63e52f79bce5dac753b"`);
        await queryRunner.query(`DROP TABLE "blog_blog_categories_blog_category"`);
        await queryRunner.query(`DROP TABLE "booking"`);
        await queryRunner.query(`DROP TYPE "public"."booking_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."booking_payment_method_enum"`);
        await queryRunner.query(`DROP TYPE "public"."booking_booking_type_enum"`);
        await queryRunner.query(`DROP TABLE "passenger"`);
        await queryRunner.query(`DROP TYPE "public"."passenger_gender_enum"`);
        await queryRunner.query(`DROP TYPE "public"."passenger_document_type_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "flight"`);
        await queryRunner.query(`DROP TYPE "public"."flight_status_enum"`);
        await queryRunner.query(`DROP TABLE "seat"`);
        await queryRunner.query(`DROP TYPE "public"."seat_class_type_enum"`);
        await queryRunner.query(`DROP TABLE "blog_category"`);
        await queryRunner.query(`DROP TABLE "blog"`);
        await queryRunner.query(`DROP TABLE "blog_tag"`);
    }
}
