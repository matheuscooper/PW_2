import { Router, Request, Response } from "express";
import { createClientControllerFactory } from "../useCases/createdClient";
import { resolve } from "path";

export const clientsRoutes = Router();

clientsRoutes.post("/clients", (req: Request, res: Response) => {
  return createClientControllerFactory.handle(req, res);
});
