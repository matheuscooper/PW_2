import { loadEnvs } from "../../../config/env";
import { ProductsRepository } from "../../../repositories/implementations/product.drizzle.repository";
import { OfferProductsUseCase } from "./offerProducts.controller";
import { OfferProductsController } from "./offerProducts.useCase";

export const offerProductsControllerFactory = new OfferProductsController(
  loadEnvs,
  new OfferProductsUseCase(new ProductsRepository())
);
