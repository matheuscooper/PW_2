import { EnvType } from "../../config/env";
import { IHashProvider } from "../../providers/IHash.provider";
import { IUsersRepository } from "../../repositories/IUsers.repository";

export type UpdateUserPayload = {
  nome?: string;
  email?: string;
  senha?: string;
};

export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: IUsersRepository,
    private readonly hasProvider: IHashProvider
  ) {}

  async execute(envs: EnvType, userId: string, payload: UpdateUserPayload) {
    const user = await this.userRepository.findById(envs, userId);

    if (payload.email && payload.email !== user?.props.email) {
      const existingEmail = await this.userRepository.findByEmail(envs, payload.email);
      if (existingEmail) throw new Error("Email já está em uso");
      user.props.email = payload.email;
    }

    if (payload.nome) {
      user.props.nome = payload.nome;
    }

    if (payload.senha) {
      const hashed = await this.hasProvider.hash(payload.senha);
      user.props.senha = hashed;
    }

    await this.userRepository.update(envs, userId, user.props);

    return user?.props;
  }
}
