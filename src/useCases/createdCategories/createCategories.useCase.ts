import { EnvType } from "../../config/env";
import { Category } from "../../entities/cateories";
import { ICategoriesRepository } from "../../repositories/ICategories.repository";

type CreateCategoryPayload = {
  nome: string;
  descricao?: string;
};

export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoriesRepository) {}

  async execute(envs: EnvType, payload: CreateCategoryPayload) {
    const category = Category.create(payload);

    await this.categoryRepository.save(envs, category);

    const { props } = category;

    return {
      message: "Categoria criada com sucesso",
      category: {
        id: props.id,
        nome: props.nome,
        descricao: props.descricao,
      },
    };
  }
}
