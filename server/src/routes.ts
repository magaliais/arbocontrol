import express from "express";
import cors from 'cors';
import { CreateComplaintController } from "./use-cases/createComplaint/createComplaintController";
import { GetComplaintsController } from "./use-cases/getComplaints/getComplaintsController";
import { GetComplaintsStatusController } from "./use-cases/getComplaintsStatus/getComplaintsStatusController";

const createComplaintController = new CreateComplaintController();
const getComplaintsController = new GetComplaintsController();
const getComplaintsStatusController = new GetComplaintsStatusController();

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

routes.get("/complaints", (req, res) => { 
  console.log("⚡️ [server]: GET /complaints");

  // * Permite que a URL de produção faça esta requisição
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");

  try {
    const response = getComplaintsController.handle(req, res);
    return response;
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

routes.get("/dashboard", (req, res) => { 
  console.log("⚡️ [server]: GET /dashboard");

  // * Permite que a URL de produção faça esta requisição
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");

  try {
    const response = getComplaintsStatusController.handle(req, res);
    return response;
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

// TODO rota para criar usuário
// routes.post("/user", (req, res) => { 
//   console.log("⚡️ [server]: POST /user");

//   // * Permite que a URL de produção faça esta requisição
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");

//   try {
//     const response = createUserController.handle(req, res);
//     return response;
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send();
//   }
// });