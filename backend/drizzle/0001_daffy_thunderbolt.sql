CREATE TABLE "categorias" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"descricao" varchar DEFAULT '',
	"nome" varchar(80) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "produtos" ADD COLUMN "categoria_id" uuid NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "categorias_nome_uq" ON "categorias" USING btree ("nome");--> statement-breakpoint
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_categoria_id_categorias_id_fk" FOREIGN KEY ("categoria_id") REFERENCES "public"."categorias"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "produtos" DROP COLUMN "categoria";