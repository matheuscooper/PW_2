import { uuidv7 } from "uuidv7";

export type ProductProps = {
  id?: string;
  nome: string;
  descricao?: string;
  preco: string;
  estoque: number;
  categoriaId: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted: string;
};

export class Product {
  private constructor(readonly props: ProductProps) {}

  static create(props: Omit<ProductProps, "id">, id?: string) {
    if (!props.nome || !props.nome.trim()) {
      throw new Error("Nome é obrigatório.");
    }
    if (!props.categoriaId || !props.categoriaId.trim()) {
      throw new Error("categoriaId é obrigatório.");
    }
    if (props.preco == null || !/^\d+(\.\d{1,2})?$/.test(String(props.preco))) {
      throw new Error("Preço inválido. Use formato 9999.99");
    }

    return new Product({
      id: id ?? uuidv7(),
      ...props,
      isDeleted: props.isDeleted ?? "0",
    });
  }

  setPrice(novoPreco: string) {
    if (!/^\d+(\.\d{1,2})?$/.test(novoPreco)) {
      throw new Error("Preço inválido. Use formato 9999.99");
    }
    this.props.preco = novoPreco;
  }

  increaseStock(qtd: number) {
    if (!Number.isInteger(qtd) || qtd <= 0) {
      throw new Error("Quantidade inválida");
    }
    this.props.estoque = (this.props.estoque ?? 0) + qtd;
  }

  decreaseStock(qtd: number) {
    if (!Number.isInteger(qtd) || qtd <= 0) {
      throw new Error("Quantidade inválida");
    }
    const atual = this.props.estoque ?? 0;
    this.props.estoque = atual - qtd;
  }

  updateName(novoNome: string) {
    if (!novoNome.trim()) {
      throw new Error("Nome inválido");
    }
    this.props.nome = novoNome.trim();
  }

  updatePrice(novoPreco: string) {
    if (!/^\d+(\.\d{1,2})?$/.test(novoPreco)) {
      throw new Error("Preço inválido. Use formato 9999.99");
    }
    this.props.preco = novoPreco;
  }

  changeCategory(novaCategoria: string) {
    if (!novaCategoria?.trim()) throw new Error("Categoria inválida");
    this.props.categoriaId = novaCategoria;
  }
}
