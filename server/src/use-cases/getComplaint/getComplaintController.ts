import { Request, Response } from "express";
import { GetComplaintUseCase } from "./getComplaintUseCase";
import neighborhoods from "../../mocks/neighborhoods";

export class GetComplaintController {
  async handle(req: Request, res: Response) {
    const getComplaintUseCase = new GetComplaintUseCase();

    const result = await getComplaintUseCase.execute(
      req.params.id
    );
    
    const complaint = result[0];

    const neighborhood = neighborhoods.filter((hit) => (
      hit.id === complaint.neighborhood
    ))

    if(neighborhood[0].name) {
      complaint.neighborhood = neighborhood[0].name;
    }

    return res.status(200).json(complaint);
  }
}