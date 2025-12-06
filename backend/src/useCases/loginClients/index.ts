import { loadEnvs } from "../../config/env";
import { BcryptHashProvider } from "../../providers/implementations/bcrypt.hash.provider";
import { JwtProvider } from "../../providers/implementations/jwt.provider";
import { LoginUserUseCase } from "./login.useCase";
import { LoginUserController } from "./login.controller";
import { UsersRepository } from "../../repositories/implementations/user.drizzle.repository";

export const loginControllerFactory = new LoginUserController(
  loadEnvs,
  new LoginUserUseCase(new UsersRepository(), new BcryptHashProvider(loadEnvs), new JwtProvider(String(loadEnvs)))
);
