import { loadEnvs } from "../../config/env";
import { UsersRepository } from "../../repositories/implementations/user.drizzle.repository";
import { CreatedClientController } from "./createdUser.controller";
import { CreatedUserUseCase } from "./createdUser.useCase";
import { BcryptHashProvider } from "../../providers/implementations/bcrypt.hash.provider";
import { JwtProvider } from "../../providers/implementations/jwt.provider";

export const createUserControllerFactory = new CreatedClientController(
  loadEnvs,
  new CreatedUserUseCase(new UsersRepository(), new BcryptHashProvider(loadEnvs)),
  new JwtProvider(String(loadEnvs))
);
