import { LoadEnv } from "../../config/env";
import { CreatedUserUseCase } from "./createdUser.useCase";
import { Request, Response } from "express";
import { JwtProvider } from "../../providers/implementations/jwt.provider";

export class CreatedClientController {
  constructor(
    private readonly loadEnvs: LoadEnv,
    private readonly createdUseCase: CreatedUserUseCase,
    private readonly jwtProvider: JwtProvider
  ) {}

  async handle(req: Request, res: Response): Promise<any> {
    try {
      const envs = await this.loadEnvs();
      const payload = req.body;
      console.log(payload);

      const { user } = await this.createdUseCase.execute(envs, payload);

      const token = this.jwtProvider.sign({
        sub: user.id,
        email: user.email,
        userType: user.userType,
      });

      return res.status(201).json({
        user,
        token,
      });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
