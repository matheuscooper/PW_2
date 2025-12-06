import { Request, Response } from "express";
import { LoadEnv } from "../../config/env";
import { LoginUserUseCase } from "./login.useCase";

export class LoginUserController {
  constructor(
    private readonly loadEnvs: LoadEnv,
    private readonly loginUserUseCase: LoginUserUseCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const envs = await this.loadEnvs();
      const payload = req.body;

      const { user } = await this.loginUserUseCase.execute(envs, payload);
      console.log(user.id);
      // 🔥 Salvar sessão
      req.session.userId = user.id;
      req.session.userType = user.userType;

      return res.json({
        message: "Login efetuado com sucesso.",
        user,
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
