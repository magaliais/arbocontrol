import { Request, Response } from "express";
import { GetComplaintUseCase } from "./getComplaintUseCase";

export class GetComplaintController {
  async handle(req: Request, res: Response) {
    const getComplaintUseCase = new GetComplaintUseCase();

    const result = await getComplaintUseCase.execute(
      req.params.id
    );
    
    const complaint = result[0];

    return res.status(200).json(complaint);
  }
}