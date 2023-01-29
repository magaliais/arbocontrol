import { Request, Response } from "express";
import { GetComplaintsStatusUseCase } from "./getComplaintsStatusUseCase";

export class GetComplaintsStatusController {
  async handle(req: Request, res: Response) {
    const getComplaintsStatusUseCase = new GetComplaintsStatusUseCase();

    const result = await getComplaintsStatusUseCase.execute();

    const total = result.length;

    const complaintsStatus = result.reduce(
      (acc, cur) => {
        switch (cur.status) {
          case "pending":
            acc.pending += 1;
            break;

          case "finished":
            acc.finished += 1;
            break;

          case "inAttendance":
            acc.inAttendance += 1;
            break;

          case "invalid":
            acc.invalid += 1;
            break;
        
          default:
            break;
        }

        return acc;
      },
      {
        finished: 0,
        pending: 0,
        inAttendance: 0,
        invalid: 0,
      }
    );

    return res.status(200).json({...complaintsStatus, total});
  }
}