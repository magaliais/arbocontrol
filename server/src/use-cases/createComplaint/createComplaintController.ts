import { Request, Response } from "express";
import { CreateComplaintUseCase } from "./createComplaintUseCase";

export class CreateComplaintController {
  async handle(req: Request, res: Response) {
    const {
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
      notes,
    } = req.body;

    const createComplaintUseCase = new CreateComplaintUseCase();

    const result = await createComplaintUseCase.execute({
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
      notes,
    });

    return res.status(201).send("Denúncia registrada com sucesso!");
  }
}