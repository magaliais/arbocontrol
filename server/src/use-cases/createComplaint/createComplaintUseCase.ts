import { prisma } from "../../prisma/client";
import { Complaint } from "@prisma/client";

interface CreateComplaintDTO {
  cep: string;
  street: string;
  neighborhood: string;
  houseNumber: string;
  complement: string;
  reference: string;
  cellphoneNumber: string;
  phoneNumber: string;
  email: string;
  place: string;
  notes: string;
}

export class CreateComplaintUseCase {
  async execute({
    cep,
    street,
    neighborhood,
    houseNumber,
    complement,
    reference,
    cellphoneNumber,
    phoneNumber,
    email,
    place,
    notes
  }: CreateComplaintDTO) {
    // Cria a denúncia no banco de dados
    const complaint = await prisma.complaint.create({
      data: { 
        cep,
        street,
        neighborhood,
        houseNumber,
        complement,
        reference,
        cellphoneNumber,
        phoneNumber,
        email,
        place,
        notes 
      },
    });

    return complaint;
  }
}