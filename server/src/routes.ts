import express from "express";
import cors from "cors";
import { CreateComplaintController } from "./use-cases/createComplaint/createComplaintController";
import { GetComplaintsController } from "./use-cases/getComplaints/getComplaintsController";
import { GetComplaintsStatusController } from "./use-cases/getComplaintsStatus/getComplaintsStatusController";
import { GetComplaintController } from "./use-cases/getComplaint/getComplaintController";
import { UpdateStatusController } from "./use-cases/updateStatus/updateStatusController";

const createComplaintController = new CreateComplaintController();
const getComplaintsStatusController = new GetComplaintsStatusController();
const getComplaintsController = new GetComplaintsController();
const getComplaintController = new GetComplaintController();
const updateStatusController = new UpdateStatusController();

export const routes = express.Router();

// * Configuração para permitir a requisição 'preflight'
routes.options("*", cors());

routes.get("/", (req, res) => {
  res.status(200).send("Ok");
});

routes.post("/complaint", (req, res) => {
  console.log("⚡️ [server]: POST /complaint");

  // * Permite que a URL de produção faça esta requisição
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.header("Access-Control-Allow-Origin", "https://arbocontrol-dashboard-38zpvm68v-magaliais.vercel.app");

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
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.header("Access-Control-Allow-Origin", "https://arbocontrol-dashboard-38zpvm68v-magaliais.vercel.app");

  try {
    const response = getComplaintsController.handle(req, res);
    return response;
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

routes.get("/complaints/:id", (req, res) => {
  console.log(`⚡️ [server]: GET /complaints/${req.params.id}`);

  // * Permite que a URL de produção faça esta requisição
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.header("Access-Control-Allow-Origin", "https://arbocontrol-dashboard-38zpvm68v-magaliais.vercel.app");

  try {
    const response = getComplaintController.handle(req, res);
    return response;
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

routes.post("/update-status", (req, res) => {
  console.log(
    `⚡️ [server]: POST /update-status/${req.body.id} => ${req.body.status}`
  );

  // * Permite que a URL de produção faça esta requisição
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.header("Access-Control-Allow-Origin", "https://arbocontrol-dashboard-38zpvm68v-magaliais.vercel.app");

  try {
    const response = updateStatusController.handle(req, res);
    return response;
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

routes.get("/dashboard", (req, res) => {
  console.log("⚡️ [server]: GET /dashboard");

  // * Permite que a URL de produção faça esta requisição
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.header("Access-Control-Allow-Origin", "https://arbocontrol-dashboard-38zpvm68v-magaliais.vercel.app");

  try {
    const response = getComplaintsStatusController.handle(req, res);
    return response;
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

routes.post("/sessions", (req, res) => {
  console.log("⚡️ [server]: POST /sessions");

  // * Permite que a URL de produção faça esta requisição
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.header("Access-Control-Allow-Origin", "https://arbocontrol-dashboard-38zpvm68v-magaliais.vercel.app");

  const { email, password } = req.body as {
    email: string;
    password: string;
  };

  // TODO verificação das credenciais
  if (email === "pjf@gmail.com") {
    if (password === "123123123") {
      return res.json({
        token: "testToken",
        refreshToken: "testRefreshToken",
        name: "Prefeitura de Juiz de Fora",
      });
    }
    return res.status(401).json({
      error: true,
      message: "Senha incorreta",
    });
  }
});

routes.get("/me", (req, res) => {
  const email = req;

  // * Permite que a URL de produção faça esta requisição
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.header("Access-Control-Allow-Origin", "https://arbocontrol-dashboard-38zpvm68v-magaliais.vercel.app");

  // ? verifica se o usuário existe no banco
  // const user = users.get(email);

  //? se o usuário não existe
  // if (!user) {
  //   return res
  //     .status(400)
  //     .json({ error: true, message: "User not found." });
  // }

  return res.json({
    email: "pjf@gmail.com",
    name: "Prefeitura de Juiz de Fora",
  });
});

// TODO rota para criar usuário
// routes.post("/user", (req, res) => {
//   console.log("⚡️ [server]: POST /user");

//   // * Permite que a URL de produção faça esta requisição
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Origin", "https://arbocontrol-dashboard-38zpvm68v-magaliais.vercel.app");

//   try {
//     const response = createUserController.handle(req, res);
//     return response;
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send();
//   }
// });
