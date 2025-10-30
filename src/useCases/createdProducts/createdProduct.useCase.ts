import { IProductsRepository } from "../../repositories/IProducts.repository";
import { ICategoriesRepository } from "../../repositories/ICategories.repository";
import { EnvType } from "../../config/env";
import { Product } from "../../entities/product";

type CreateProductPayload = {
  nome: string;
  descricao?: string;
  preco: string;
  estoque?: number;
  categoriaId: string;
  nomeCategoria: string;
};

export class CreateProductUseCase {
  constructor(
    private readonly productsRepository: IProductsRepository,
    private readonly categoriesReposiyory: ICategoriesRepository
  ) {}

  async execute(envs: EnvType, payload: CreateProductPayload) {
    let categoriaId = payload.categoriaId;

    if (!categoriaId) {
      const nomeCategoria = payload.nomeCategoria?.trim();
      if (!nomeCategoria) throw new Error("Informe o 'categoriaId' ou 'nomeCategoria'");
    }
    const categoria = await this.categoriesReposiyory.findByName(envs, payload.nomeCategoria);

    if (!categoria) throw new Error("Categoria não existe");
    categoriaId = categoria.id;

    const nome = payload.nome;
    const check_product = await this.productsRepository.findByNome(envs, payload.nome);

    if (check_product) throw new Error("Já existe produto com esse nome");

    const product = Product.create({
      nome,
      descricao: payload.descricao ?? "",
      preco: payload.preco,
      estoque: payload.estoque ?? 0,
      categoriaId,
    });

    await this.productsRepository.save(envs, product);

    const { props } = product;

    return {
      message: "Produto criado com sucesso",
      product: {
        id: props.id,
        nome: props.nome,
        descricao: props.descricao,
        preco: props.preco,
        estoque: props.estoque,
        categoriaId: props.categoriaId,
      },
    };
  }
}
