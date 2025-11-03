CREATE TABLE "clientes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" text NOT NULL,
	"login" text NOT NULL,
	"email" text NOT NULL,
	"cpf" text NOT NULL,
	"senha" text NOT NULL,
	CONSTRAINT "clientes_login_unique" UNIQUE("login"),
	CONSTRAINT "clientes_email_unique" UNIQUE("email"),
	CONSTRAINT "clientes_cpf_unique" UNIQUE("cpf")
);
--> statement-breakpoint
CREATE TABLE "produtos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" varchar(120) NOT NULL,
	"descricao" text DEFAULT '',
	"categoria" varchar(60) DEFAULT 'geral' NOT NULL,
	"preco" numeric(10, 2) NOT NULL,
	"estoque" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "produtos_nome_uq" ON "produtos" USING btree ("nome");