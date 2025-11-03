import { InferSelectModel, eq } from "drizzle-orm";
import { ICategoriesRepository } from "../ICategories.repository";
import { categorySchema } from "../../database/schemas/category.schema";
import { Category } from "../../entities/cateories";
import { EnvType } from "../../config/env";
import { drizzle } from "drizzle-orm/node-postgres";
import { ca } from "zod/locales";

export class CategoriesRepository implements ICategoriesRepository {
  private maptToEntity(categorie: InferSelectModel<typeof categorySchema> | undefined) {
    if (!categorie) return null;

    return Category.create(
      {
        nome: categorie.nome,
        descricao: categorie.descricao,
      },
      categorie.id
    );
  }

  async save(envs: EnvType, category: Category): Promise<void | null> {
    const db = drizzle(envs.DATABASE_URL);

    await db.insert(categorySchema).values({
      id: category.props.id,
      nome: category.props.nome,
      descricao: category.props.descricao,
    });
  }

  async findByName(envs: EnvType, nome: string): Promise<{ id: string; nome: string } | null> {
    const db = drizzle(envs.DATABASE_URL);

    const [resultCatory] = await db
      .select({ id: categorySchema.id, nome: categorySchema.nome })
      .from(categorySchema)
      .where(eq(categorySchema.nome, nome));

    return resultCatory ?? null;
  }
}
