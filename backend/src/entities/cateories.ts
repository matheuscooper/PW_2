import { uuidv7 } from "uuidv7";

export type CategoryProps = {
  id?: string;
  nome: string;
  descricao?: string;
};

export class Category {
  private constructor(readonly props: CategoryProps) {}

  static create(props: Omit<CategoryProps, "id">, id?: string) {
    if (!props.nome || !props.nome?.trim()) throw new Error("Nome da categoria é obrigatório");

    return new Category({
      id: id ?? uuidv7(),
      ...props,
    });
  }

  updateName(novoNome: string) {
    const n = novoNome?.trim();
    if (!n) throw new Error("Nome inválido.");
    this.props.nome = n;
  }

  updateDescription(desc?: string) {
    this.props.descricao = desc ?? "";
  }
}
