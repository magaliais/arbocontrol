import { Request, Response } from "express";
import { UpdateStatusUseCase } from "./updateStatusUseCase";

export class UpdateStatusController {
  async handle(req: Request, res: Response) {
    const updateStatusUseCase = new UpdateStatusUseCase();

    const result = await updateStatusUseCase.execute(req.body.id, req.body.status);

    const complaint = result;

    return res.status(200).json(complaint);
  }
}