import { EnvType } from "../../config/env";
import { User } from "../../entities/user";
import { IHashProvider } from "../../providers/IHash.provider";
import { IUsersRepository } from "../../repositories/IUsers.repository";

type CreateUserPayload = {
  nome: string;
  email: string;
  cpf: string;
  senha: string;
  userType: string;
};

export class CreatedUserUseCase {
  constructor(
    private readonly userRepository: IUsersRepository,
    private readonly hashProvider: IHashProvider
  ) {}

  async execute(envs: EnvType, payload: CreateUserPayload) {
    const email = payload.email.trim().toLowerCase();
    const cpfDigits = payload.cpf.replace(/\D/g, "");

    // --- VALIDAÇÕES ---
    const existingByEmail = await this.userRepository.findByEmail(envs, email);
    if (existingByEmail) {
      throw new Error("E-mail já cadastrado.");
    }

    const existingByCPF = await this.userRepository.findByCPF(envs, cpfDigits);
    if (existingByCPF) {
      throw new Error("CPF já cadastrado.");
    }

    // Hash da senha
    const senhaHash = await this.hashProvider.hash(payload.senha);

    const user = User.create({
      nome: payload.nome,
      email,
      cpf: cpfDigits,
      senha: senhaHash,
      userType: payload.userType,
    });

    await this.userRepository.save(envs, user);

    const { senha, ...safe } = user.props;

    return {
      user: {
        ...safe,
        id: user.props.id,
      },
      message: "Usuário criado com sucesso",
    };
  }
}
