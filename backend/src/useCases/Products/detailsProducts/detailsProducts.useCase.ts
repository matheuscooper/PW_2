import { StringDecoder } from "string_decoder";
import { EnvType } from "../../../config/env";
import { IProductsRepository } from "../../../repositories/IProducts.repository";
import { ICategoriesRepository } from "../../../repositories/ICategories.repository";

export type ProductDetailsDTO = {
  id: string;
  nome: string;
  descricao?: string;
  preco: string;
  estoque: number;
  categoria: {
    id: string;
    nome: string;
    descricao?: string;
  } | null;
};

export class DetailsProductsUseCase {
  constructor(
    private readonly detailsProductRepository: IProductsRepository,
    private readonly categoriesReository: ICategoriesRepository
  ) {}

  async execute(envs: EnvType, id: string): Promise<ProductDetailsDTO> {
    const product = await this.detailsProductRepository.findById(envs, id);

    if (!product) throw new Error("Produto não encontrado");

    const categoria = await this.categoriesReository.findById(envs, product.props.categoriaId);

    return {
      id: product.props.id!,
      nome: product.props.nome,
      descricao: product.props.descricao,
      preco: product.props.preco,
      estoque: product.props.estoque,
      categoria: categoria
        ? {
            id: categoria.props.id!,
            nome: categoria.props.nome,
            descricao: categoria.props.descricao,
          }
        : null,
    };
  }
}
