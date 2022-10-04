import { Complaint } from "@prisma/client";
import { prisma } from "../../prisma/client";

export class GetComplaintsUseCase {
  async execute(): Promise<Complaint[]> {
    const complaints = await prisma.complaint.findMany({});

    return complaints;
  }
}