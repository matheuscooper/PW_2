import { IProductsRepository } from "../../../repositories/IProducts.repository";
import { ICategoriesRepository } from "../../../repositories/ICategories.repository";
import { EnvType } from "../../../config/env";
import { Product } from "../../../entities/product";

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
    const { nome, descricao, preco, estoque, categoriaId } = payload;

    // VALIDAR SE A CATEGORIA EXISTE
    if (!categoriaId) throw new Error("categoriaId é obrigatório");

    const categoria = await this.categoriesReposiyory.findById(envs, categoriaId);
    if (!categoria) throw new Error("Categoria não existe");

    // VERIFICAR SE JÁ EXISTE PRODUTO COM ESTE NOME
    const exists = await this.productsRepository.findByNome(envs, nome);
    if (exists) throw new Error("Já existe produto com esse nome");

    const product = Product.create({
      nome,
      descricao: payload.descricao ?? "",
      preco: payload.preco,
      estoque: payload.estoque ?? 0,
      categoriaId,
      isDeleted: "0",
    });

    console.log("📨 [USECASE] Payload recebido antes do create:", payload);

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
