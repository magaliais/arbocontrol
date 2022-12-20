import { Complaint } from "@prisma/client";
import { prisma } from "../../prisma/client";

export class UpdateStatusUseCase {
  async execute(id: string, status: string): Promise<Complaint> {
    const complaint = await prisma.complaint.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      }
    });

    return complaint;
  }
}