ALTER TABLE "Users" DROP CONSTRAINT "Users_user_type_id_User_Types_id_fk";
--> statement-breakpoint
ALTER TABLE "Users" ADD COLUMN "user_type" text NOT NULL;--> statement-breakpoint
ALTER TABLE "Users" DROP COLUMN "user_type_id";