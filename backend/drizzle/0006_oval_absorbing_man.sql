CREATE TABLE "Product" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" varchar(120) NOT NULL,
	"descricao" text DEFAULT 'Geral' NOT NULL,
	"categoria_id" uuid NOT NULL,
	"preco" numeric(10, 2) NOT NULL,
	"estoque" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Purchases" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"total" numeric NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "Purchase_Items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"purchase_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"quantidade" integer NOT NULL,
	"preco_unitario" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" text NOT NULL,
	"email" text NOT NULL,
	"cpf" text NOT NULL,
	"senha" text NOT NULL,
	"user_type_id" uuid NOT NULL,
	CONSTRAINT "Users_email_unique" UNIQUE("email"),
	CONSTRAINT "Users_cpf_unique" UNIQUE("cpf")
);
--> statement-breakpoint
CREATE TABLE "User_Types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
DROP TABLE "clientes" CASCADE;--> statement-breakpoint
DROP TABLE "produtos" CASCADE;--> statement-breakpoint
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoria_id_categorias_id_fk" FOREIGN KEY ("categoria_id") REFERENCES "public"."categorias"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Purchases" ADD CONSTRAINT "Purchases_user_id_Users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Purchase_Items" ADD CONSTRAINT "Purchase_Items_purchase_id_Purchases_id_fk" FOREIGN KEY ("purchase_id") REFERENCES "public"."Purchases"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Purchase_Items" ADD CONSTRAINT "Purchase_Items_product_id_Product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."Product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Users" ADD CONSTRAINT "Users_user_type_id_User_Types_id_fk" FOREIGN KEY ("user_type_id") REFERENCES "public"."User_Types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "produtos_nome_uq" ON "Product" USING btree ("nome");