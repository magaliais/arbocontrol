import { Request, Response } from "express";
import { GetComplaintsUseCase } from "./getComplaintsUseCase";

export class GetComplaintsController {
  async handle(req: Request, res: Response) {
    const getComplaintsUseCase = new GetComplaintsUseCase();

    const result = await getComplaintsUseCase.execute(
      String(req.query.status),
      String(req.query.neighborhood),
      String(req.query.id ?? 'null')
    );

    const { currentPage = 1, per_page = 10 } = req.query;
    const totalCount = result.length;
    const pageStart = (Number(currentPage) - 1) * Number(per_page);
    const pageEnd = pageStart + Number(per_page);

    const complaints = result.slice(pageStart, pageEnd);

    return res.status(200).json({ complaints, totalCount });
  }
}
