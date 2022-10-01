import express from "express";
import cors from 'cors';
import { CreateComplaintController } from "./use-cases/createComplaint/createComplaintController";

const createComplaintController = new CreateComplaintController();

export const routes = express.Router();

// * Configuração para permitir a requisição 'preflight'
routes.options("*", cors());

routes.get("/", (req, res) => { 
  res.status(200).send("Ok")
});

routes.post("/complaint", (req, res) => { 
  console.log("⚡️ [server]: POST /complaint");

  // * Permite que a URL de produção faça esta requisição
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");

  try {
    const response = createComplaintController.handle(req, res);
    return response;
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});