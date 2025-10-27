import { eq, or, and, InferInsertModel, InferSelectModel, ilike, sql } from "drizzle-orm";
import { productSchema } from "../../database/schemas/product.schema";
import { Product } from "../../entities/product";
import { IProductsRepository, ListProductsParams, ListProductsResult, ProductPatch } from "../IProducts.repository";
import { EnvType } from "../../config/env";
import { drizzle } from "drizzle-orm/node-postgres";

type ProductSelect = InferSelectModel<typeof productSchema>;
type ProductInsert = InferInsertModel<typeof productSchema>;
type ProductPartial = Partial<ProductInsert>;

export class ProductsRepository implements IProductsRepository {
  private mapToEntity(product: ProductSelect | undefined) {
    if (!product) return null;

    return Product.create(
      {
        nome: product.nome,
        descricao: product.descricao,
        preco: product.preco,
        estoque: product.estoque,
        categoriaId: product.categoriaId,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
      product.id
    );
  }
  async save(envs: EnvType, product: Product): Promise<void> {
    const db = drizzle(envs.DATABASE_URL);

    await db.insert(productSchema).values({
      id: product.props.id,
      nome: product.props.nome,
      descricao: product.props.descricao,
      preco: product.props.preco,
      estoque: product.props.estoque,
      categoriaId: product.props.categoriaId,
      createdAt: product.props.createdAt,
      updatedAt: product.props.updatedAt,
    });
  }

  async findById(envs: EnvType, id: string): Promise<Product | null> {
    const db = drizzle(envs.DATABASE_URL);

    const [resultById] = await db.select().from(productSchema).where(eq(productSchema.id, id)).limit(1);

    return this.mapToEntity(resultById);
  }

  async update(envs: EnvType, id: string, product: Product): Promise<void> {
    const db = drizzle(envs.DATABASE_URL);

    await db.update(productSchema).set(product.props).where(eq(productSchema.id, id));
  }

  async updatePartial(envs: EnvType, id: string, patch: ProductPatch): Promise<void> {
    const db = drizzle(envs.DATABASE_URL);

    const updatePath: ProductPartial = {};
    if (patch.nome !== undefined) updatePath.nome = patch.nome;
    if (patch.descricao !== undefined) updatePath.descricao = patch.descricao;
    if (patch.preco !== undefined) updatePath.preco = patch.preco;
    if (patch.estoque !== undefined) updatePath.estoque = patch.estoque;
    if (patch.categoriaId !== undefined) updatePath.categoriaId = patch.categoriaId;

    await db.update(productSchema).set(updatePath).where(eq(productSchema.id, id));
  }

  async deleteById(envs: EnvType, id: string): Promise<void> {
    const db = drizzle(envs.DATABASE_URL);

    await db.delete(productSchema).where(eq(productSchema.id, id));
  }

  async findByNome(envs: EnvType, nome: string): Promise<Product | null> {
    const db = drizzle(envs.DATABASE_URL);

    const [resultName] = await db.select().from(productSchema).where(eq(productSchema.nome, nome)).limit(1);

    return this.mapToEntity(resultName);
  }

  async list(envs: EnvType, params: ListProductsParams = {}): Promise<ListProductsResult> {
    const db = drizzle(envs.DATABASE_URL);

    // paginação segura
    const page = Math.max(1, params.page ?? 1);
    const perPage = Math.min(100, Math.max(1, params.perPage ?? 10));
    const offset = (page - 1) * perPage;

    // filtros
    const filters = [];
    if (params.categoriaId) {
      filters.push(eq(productSchema.categoriaId, params.categoriaId));
    }
    if (params.search?.trim()) {
      const q = `%${params.search.trim()}%`;
      // busca por nome OU descrição (case-insensitive)
      filters.push(or(ilike(productSchema.nome, q), ilike(productSchema.descricao, q)));
    }
    const where = filters.length ? and(...filters) : undefined;

    // total (para paginação)
    const [count] = await db
      .select({ count: sql<number>`count(*)` })
      .from(productSchema)
      .where(where as any);

    // ordenação
    const orderByCol =
      params.orderBy === "preco"
        ? productSchema.preco
        : params.orderBy === "nome"
          ? productSchema.createdAt
          : productSchema.nome; // default: nome

    const isDesc = (params.order ?? "asc").toLowerCase() === "desc";

    // itens
    const rows = await db
      .select()
      .from(productSchema)
      .where(where as any)
      .orderBy(isDesc ? sql`${orderByCol} DESC` : sql`${orderByCol} ASC`)
      .limit(perPage)
      .offset(offset);

    const items = rows.map((r) => this.mapToEntity(r)!).filter(Boolean) as Product[];

    return {
      items,
      total: Number(count),
      page,
      perPage,
    };
  }
}
