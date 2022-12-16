import { Complaint } from "@prisma/client";
import { prisma } from "../../prisma/client";

export class GetComplaintUseCase {
  async execute(id: string): Promise<Complaint[]> {
    const complaint = await prisma.complaint.findMany({
      where: {
        id: id,
      },
    });

    return complaint;
  }
}