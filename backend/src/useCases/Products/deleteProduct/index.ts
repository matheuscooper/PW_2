import { loadEnvs } from "../../../config/env";
import { ProductsRepository } from "../../../repositories/implementations/product.drizzle.repository";
import { DeleteController } from "./delete.controller";
import { DeleteUseCase } from "./delete.useCase";

export const deleteControllerFactory = new DeleteController(loadEnvs, new DeleteUseCase(new ProductsRepository()));
