import express from "express";
import cors from "cors";
import postgres from "./db/postgres";
import ROUTES from "./constant/Routes";

import registerRoutes from "./routes/registerRoutes";

export async function initServer(): Promise<express.Express> {
  const app = express();
  await postgres.connect();

  app.set("port", process.env.PORT || 4000);
  app.use(cors());
  app.use(express.json());

  app.use(ROUTES.REGISTER, registerRoutes)

  return app;
}
