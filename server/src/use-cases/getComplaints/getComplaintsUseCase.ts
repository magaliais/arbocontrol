import { Complaint } from "@prisma/client";
import { prisma } from "../../prisma/client";

export class GetComplaintsUseCase {
  async execute(status: string): Promise<Complaint[]> {
    if (status === "all") {
      const complaints = await prisma.complaint.findMany({
        orderBy: [
          {
            created_at: "asc",
          },
        ],
      });

      return complaints;
    }

    const complaints = await prisma.complaint.findMany({
      where: {
        status: status,
      },
      orderBy: [
        {
          created_at: "asc",
        },
      ],
    });

    return complaints;
  }
}
