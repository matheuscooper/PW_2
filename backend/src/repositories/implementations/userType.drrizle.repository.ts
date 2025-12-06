import { userTypeSchema } from "../../database/schemas/userTypes.schema";
import { IUserTypeRepository } from "../IUserType.repository";
import { UserType } from "../../entities/userType";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { EnvType } from "../../config/env";

export class UserTypeRepository implements IUserTypeRepository {
  private mapToEntity(row: typeof userTypeSchema.$inferSelect | undefined) {
    if (!row) return null;

    const allowed = ["admin", "cliente"] as const;
    const safeName = allowed.includes(row.name as any) ? (row.name as "admin" | "cliente") : "cliente";

    return UserType.create({ name: safeName }, row.id);
  }

  async findById(envs: EnvType, id: string): Promise<UserType | null> {
    const db = drizzle(envs.DATABASE_URL);

    const [row] = await db.select().from(userTypeSchema).where(eq(userTypeSchema.id, id)).limit(1);

    return this.mapToEntity(row);
  }

  async findByName(envs: EnvType, name: string): Promise<UserType | null> {
    const db = drizzle(envs.DATABASE_URL);

    const [row] = await db.select().from(userTypeSchema).where(eq(userTypeSchema.name, name)).limit(1);

    return this.mapToEntity(row);
  }
}
