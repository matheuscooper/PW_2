import { email } from "zod";
import { LoadEnv } from "../../config/env";
import { CreatedClientUseCase } from "./createdClient.useCase";
import { Request, Response } from "express";
export class CreatedClientController {
  constructor(
    private readonly loadEnvs: LoadEnv,
    private readonly createdClientUserCase: CreatedClientUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<any> {
    try {
      const envs = await this.loadEnvs();
      const payload = req.body;

      const resultsClient = await this.createdClientUserCase.execute(
        envs,
        payload
      );

      res.status(201).json({
        message: "Cliente cadastrado com sucesso",
        client: {
          nome: resultsClient.client.nome,
          email: resultsClient.client.email,
        },
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
