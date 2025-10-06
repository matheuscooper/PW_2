import { IClientsRepository } from "../IClients.repository";
import { clientSchema } from "../../database/schemas/client.schema";
import { Client } from "../../entities/client";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { EnvType } from "../../config/env";

export class ClientsRepository implements IClientsRepository {
  private mapToEntity(client: typeof clientSchema.$inferSelect | undefined) {
    if (!client) {
      return null;
    }
    return Client.create(
      {
        nome: client.nome,
        login: client.login,
        email: client.email,
        cpf: client.cpf,
        senha: client.senha,
      },
      client.id
    );
  }
  async save(envs: EnvType, client: Client): Promise<void> {
    const db = drizzle(envs.DATABASE_URL);

    await db.insert(clientSchema).values({
      id: client.props.id,
      nome: client.props.nome,
      login: client.props.login,
      email: client.props.email,
      cpf: client.props.cpf,
      senha: client.props.senha,
    });
  }

  async findByCPF(envs: EnvType, cpf: string): Promise<Client | null> {
    const db = drizzle(envs.DATABASE_URL);

    const [result] = await db
      .select()
      .from(clientSchema)
      .where(eq(clientSchema.cpf, cpf))
      .limit(1);

    if (!result) return null;

    return this.mapToEntity(result);
  }

  async findByEmail(envs: EnvType, email: string): Promise<Client | null> {
    const db = drizzle(envs.DATABASE_URL);

    const [resultEmail] = await db
      .select()
      .from(clientSchema)
      .where(eq(clientSchema.email, email))
      .limit(1);

    if (!resultEmail) return null;

    return this.mapToEntity(resultEmail);
  }

  async findById(envs: EnvType, id: string): Promise<Client | null> {
    const db = drizzle(envs.DATABASE_URL);

    const [resultById] = await db
      .select()
      .from(clientSchema)
      .where(eq(clientSchema.id, id))
      .limit(1);

    return this.mapToEntity(resultById);
  }
}
