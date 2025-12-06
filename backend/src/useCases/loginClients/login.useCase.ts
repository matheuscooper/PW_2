import { EnvType } from "../../config/env";
import { IUsersRepository } from "../../repositories/IUsers.repository";
import { IHashProvider } from "../../providers/IHash.provider";
import { JwtProvider } from "../../providers/implementations/jwt.provider";

type LoginPayload = {
  email: string;
  senha: string;
};

export class LoginUserUseCase {
  constructor(
    private readonly userRepository: IUsersRepository,
    private readonly hashProvider: IHashProvider,
    private readonly jwtProvider: JwtProvider
  ) {}

  async execute(envs: EnvType, payload: LoginPayload) {
    const email = payload.email.trim().toLowerCase();

    // 1) Buscar cliente pelo email
    const user = await this.userRepository.findByEmail(envs, email);
    if (!user) throw new Error("E-mail ou senha incorretos.");

    // 2) Validar senha
    const senhaCorreta = await this.hashProvider.compare(payload.senha, user.props.senha);

    if (!senhaCorreta) throw new Error("E-mail ou senha incorretos.");

    // 3) Gerar token JWT
    const token = this.jwtProvider.sign({
      sub: user.props.id,
      email: user.props.email,
    });

    const { senha, ...safe } = user.props;

    return {
      user: { ...safe, id: user.props.id },
      token,
    };
  }
}
