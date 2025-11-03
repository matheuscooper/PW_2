import { EnvType } from "../../config/env";
import { Client } from "../../entities/client";
import { IHashProvider } from "../../providers/IHash.provider";
import { IClientsRepository } from "../../repositories/IClients.repository";

type CreateClientPayload = {
  nome: string;
  login: string;
  email: string;
  cpf: string;
  senha: string;
};

export class CreatedClientUseCase {
  constructor(
    private readonly clientRepository: IClientsRepository,
    private readonly hashProvider: IHashProvider
  ) {}

  async execute(envs: EnvType, payload: CreateClientPayload) {
    const email = payload.email.trim().toLowerCase();
    const cpfDigits = payload.cpf.replace(/\D/g, "");

    const existingByEmail = await this.clientRepository.findByEmail(
      envs,
      email
    );
    if (existingByEmail) throw new Error("E-mail já cadastrado.");

    const existingByCPF = await this.clientRepository.findByCPF(
      envs,
      cpfDigits
    );
    if (existingByCPF) throw new Error("CPF já cadastrado.");

    const senhaHash = await this.hashProvider.hash(payload.senha);

    const client = Client.create({ ...payload, senha: senhaHash });

    await this.clientRepository.save(envs, client);
    const { senha, ...safe } = client.props;
    return { client: { ...safe, id: client.props.id } };
  }
}
