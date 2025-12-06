import { Request, Response } from "express";
import { LoadEnv } from "../../../config/env";
import { DeleteUseCase } from "./delete.useCase";
import { string } from "zod";
import { error } from "console";

export class DeleteController {
  constructor(
    private readonly loadEnvs: LoadEnv,
    private readonly deleteUseCase: DeleteUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<any> {
    try {
      const envs = await this.loadEnvs();
      const id = req.params.id;
      console.log("Controler", id);

      await this.deleteUseCase.execute(envs, id);

      return res.json({ message: "Deletado" });
    } catch (err: any) {
      console.error(err);

      return res.status(400).json({ error: err.message });
    }
  }
}
