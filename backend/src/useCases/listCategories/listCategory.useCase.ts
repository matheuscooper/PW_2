import { EnvType } from "../../config/env";
import { ICategoriesRepository } from "../../repositories/ICategories.repository";

export class ListCategoryUseCase {
  constructor(private readonly listCategoryRepository: ICategoriesRepository) {}

  async execute(envs: EnvType) {
    const result = await this.listCategoryRepository.list(envs);

    const formatted = result.map((cat) => ({
      id: cat.props.id,
      nome: cat.props.nome,
      descricao: cat.props.descricao,
    }));

    return {
      result: formatted,
    };
  }
}
