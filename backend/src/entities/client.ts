import { v7 as uuidv7 } from "uuid";
import { string } from "zod";

export interface ClientProps {
  readonly id: string;
  nome: string;
  login: string;
  email: string;
  cpf: string;
  senha: string;
}

export class Client {
  private constructor(readonly props: ClientProps) {}

  static create(props: Omit<ClientProps, "id">, id?: string) {
    return new Client({
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

  changeLogin(novoLogin: string) {
    if (!/^[a-z0-9._-]{3,30}$/.test(novoLogin)) {
      throw new Error("Login inválido (somente letras, números, ., _, -)");
    }
    this.props.login = novoLogin.toLowerCase();
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
