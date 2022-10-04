import { Request, Response } from "express";
import { GetComplaintsStatusUseCase } from "./getComplaintsStatusUseCase";

export class GetComplaintsStatusController {
  async handle(req: Request, res: Response) {
    const getComplaintsStatusUseCase = new GetComplaintsStatusUseCase();

    const result = await getComplaintsStatusUseCase.execute();

    const total = result.length;

    const complaintsStatus = result.reduce(
      (acc, cur) => {
        cur.status === "pending" ? (acc.pending += 1) : (acc.finished += 1);

        return acc;
      },
      {
        finished: 0,
        pending: 0,
      }
    );

    return res.status(200).json({...complaintsStatus, total});
  }
}