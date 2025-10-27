import { loadEnvs } from "../../config/env";
import { ClientsRepository } from "../../repositories/implementations/client.drizzle.repository";
import { CreatedClientController } from "./createdClient.controller";
import { CreatedClientUseCase } from "./createdClient.useCase";
import { BcryptHashProvider } from "../../providers/implementations/bcrypt.hash.provider";

export const createClientControllerFactory = new CreatedClientController(
  loadEnvs,
  new CreatedClientUseCase(
    new ClientsRepository(),
    new BcryptHashProvider(loadEnvs)
  )
);
