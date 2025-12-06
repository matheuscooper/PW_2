import { v7 as uuidv7 } from "uuid";

export type UserType = "admin" | "cliente";

export interface UserProps {
  readonly id?: string;
  nome: string;
  email: string;
  cpf: string;
  senha: string;
  userType: UserType;
}

export class User {
  private constructor(readonly props: UserProps) {}

  static create(props: Omit<UserProps, "id">, id?: string) {
    return new User({
      id: id ?? uuidv7(),
      ...props,
    });
  }
  changeName(novoNome: string) {
    if (!novoNome || novoNome.trim().length < 2) {
      throw new Error("Nome inválido");
    }
    this.props.nome = novoNome.trim();
  }

  changeEmail(novoEmail: string) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(novoEmail)) {
      throw new Error("Email inválido");
    }
    this.props.email = novoEmail.toLowerCase();
  }

  chancePassword(novaSenha: string) {
    if (novaSenha.length < 8) {
      throw new Error("Mínimo de 8 Caracteres");
    }
    this.props.senha = novaSenha;
  }
}
