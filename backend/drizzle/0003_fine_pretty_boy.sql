ALTER TABLE "categorias" ALTER COLUMN "descricao" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "produtos" ALTER COLUMN "descricao" SET DEFAULT 'Geral';--> statement-breakpoint
ALTER TABLE "categorias" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "categorias" DROP COLUMN "updated_at";