ALTER TABLE "Product" ALTER COLUMN "is_deleted" SET DATA TYPE varchar(1);--> statement-breakpoint
ALTER TABLE "Product" ALTER COLUMN "is_deleted" SET DEFAULT '0';