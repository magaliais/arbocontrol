import express, { Express, Request, Response } from "express";
import { routes } from "./routes";
import cors from "cors";
require('dotenv').config();

const app: Express = express();

// MIDDLEWARES
app.use(express.json({limit: '5mb'}));
app.use(routes);
app.use(cors());

const port = process.env.PORT || 8080;

// START SERVER
app.listen(port, () => {
  console.log(`⚡️ [server]: Server is running at http://localhost:${port}`);
});