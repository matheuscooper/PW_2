import { IUsersRepository } from "../IUsers.repository";
import { userSchema } from "../../database/schemas/user.schema";
import { User } from "../../entities/user";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { EnvType } from "../../config/env";
import { UpdateUser } from "../IUsers.repository";

export class UsersRepository implements IUsersRepository {
  private mapToEntity(user: typeof userSchema.$inferSelect | undefined) {
    if (!user) {
      return null;
    }
    return User.create(
      {
        nome: user.nome,
        email: user.email,
        cpf: user.cpf,
        senha: user.senha,
        userType: user.userType,
      },
      user.id
    );
  }
  async save(envs: EnvType, user: User): Promise<void> {
    const db = drizzle(envs.DATABASE_URL);

    await db.insert(userSchema).values({
      id: user.props.id,
      nome: user.props.nome,
      email: user.props.email,
      cpf: user.props.cpf,
      senha: user.props.senha,
      userType: user.props.userType,
    });
  }

  async findByCPF(envs: EnvType, cpf: string): Promise<User | null> {
    const db = drizzle(envs.DATABASE_URL);

    const [result] = await db.select().from(userSchema).where(eq(userSchema.cpf, cpf)).limit(1);

    if (!result) return null;

    return this.mapToEntity(result);
  }

  async findByEmail(envs: EnvType, email: string): Promise<User | null> {
    const db = drizzle(envs.DATABASE_URL);

    const [resultEmail] = await db.select().from(userSchema).where(eq(userSchema.email, email)).limit(1);

    if (!resultEmail) return null;

    return this.mapToEntity(resultEmail);
  }

  async findById(envs: EnvType, id: string): Promise<User | null> {
    const db = drizzle(envs.DATABASE_URL);

    const [resultById] = await db.select().from(userSchema).where(eq(userSchema.id, id)).limit(1);

    return this.mapToEntity(resultById);
  }

  async update(envs: EnvType, id: string, updatePayload: UpdateUser): Promise<void> {
    const db = drizzle(envs.DATABASE_URL);

    await db.update(userSchema).set(updatePayload).where(eq(userSchema.id, id));
  }
}
