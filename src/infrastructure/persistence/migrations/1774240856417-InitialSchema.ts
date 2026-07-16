import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1774240856417 implements MigrationInterface {
  name = 'InitialSchema1774240856417'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "leads" ("id" uuid NOT NULL, "x_correlation_id" uuid NOT NULL, "type" character varying(20) NOT NULL, "site_id" character varying(64) NOT NULL, "session_id" uuid NOT NULL, "tracking" jsonb NOT NULL DEFAULT '{}', "context" jsonb NOT NULL, "niche_data" jsonb NOT NULL DEFAULT '{}', "user_agent" text NOT NULL DEFAULT '', "host" character varying(255) NOT NULL DEFAULT '', "language" text NOT NULL DEFAULT '', "referrer" text NOT NULL DEFAULT '', "ip" inet NOT NULL, "protocol" character varying(50) NOT NULL DEFAULT '', "x_original_host" character varying(255) NOT NULL DEFAULT '', "method" character varying(50) NOT NULL DEFAULT 'UNKNOWN', "fingerprint" character varying(64) NOT NULL, "api_version" character varying(20) NOT NULL, "status" character varying(50) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_cd102ed7a9a4ca7d4d8bfeba406" PRIMARY KEY ("id")); COMMENT ON COLUMN "leads"."type" IS 'visit | lead | api'; COMMENT ON COLUMN "leads"."site_id" IS 'sha256'; COMMENT ON COLUMN "leads"."protocol" IS 'http/https'; COMMENT ON COLUMN "leads"."method" IS 'GET | POST | PUT | DEL'; COMMENT ON COLUMN "leads"."fingerprint" IS 'sha256'; COMMENT ON COLUMN "leads"."api_version" IS 'v1'; COMMENT ON COLUMN "leads"."status" IS 'PENDING | VISIT | API | UNKNOWN'`);
    await queryRunner.query(`CREATE INDEX "IDX_leads_only_pending" ON "leads" ("status") WHERE "status" = 'PENDING'`);
    await queryRunner.query(`CREATE INDEX "IDX_94f034e43c8b266f6c9f90768b" ON "leads" ("fingerprint", "ip") `);
    await queryRunner.query(`CREATE INDEX "IDX_c3cb4fb4042fe68ecbb5ba3f93" ON "leads" ("site_id", "updated_at") `);
    await queryRunner.query(`CREATE INDEX "IDX_363de77d23794fabe56bd19b1d" ON "leads" ("site_id", "created_at") `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_363de77d23794fabe56bd19b1d"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_c3cb4fb4042fe68ecbb5ba3f93"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_94f034e43c8b266f6c9f90768b"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_leads_only_pending"`);
    await queryRunner.query(`DROP TABLE "leads"`);
  }

}
