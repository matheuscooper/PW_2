import { InferSelectModel, eq } from "drizzle-orm";
import { ICategoriesRepository } from "../ICategories.repository";
import { categorySchema } from "../../database/schemas/category.schema";
import { Category } from "../../entities/cateories";
import { EnvType } from "../../config/env";
import { drizzle } from "drizzle-orm/node-postgres";
import { ca, de } from "zod/locales";
import { ListProductsResult } from "../IProducts.repository";

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

  async list(envs: EnvType): Promise<Category[]> {
    const db = drizzle(envs.DATABASE_URL);

    const result = await db
      .select({ id: categorySchema.id, nome: categorySchema.nome, descricao: categorySchema.descricao })
      .from(categorySchema);

    return result.map((result) =>
      Category.create(
        {
          nome: result.nome,
          descricao: result.descricao,
        },
        result.id
      )
    );
  }

  async findById(envs: EnvType, id: string): Promise<Category | null> {
    const db = drizzle(envs.DATABASE_URL);

    const [resultById] = await db.select().from(categorySchema).where(eq(categorySchema.id, id)).limit(1);

    return this.maptToEntity(resultById);
  }
}
