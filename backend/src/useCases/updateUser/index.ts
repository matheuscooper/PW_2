import { loadEnvs } from "../../config/env";
import { BcryptHashProvider } from "../../providers/implementations/bcrypt.hash.provider";
import { UsersRepository } from "../../repositories/implementations/user.drizzle.repository";
import { UpdateUserController } from "./updaterUser.controller";
import { UpdateUserUseCase } from "./updaterUser.useCase";

export const updateUserControllerFactory = new UpdateUserController(
  loadEnvs,
  new UpdateUserUseCase(new UsersRepository(), new BcryptHashProvider(loadEnvs))
);
