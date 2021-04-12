import express from "express";
import cors from "cors";
import postgres from "./db/postgres";
import ROUTES from "./constant/Routes";

import { userRateLimiter, loginRateLimiter } from "./middleware/rateLimit";

import loginRoutes from "./routes/loginRoutes";
import registerRoutes from "./routes/registerRoutes";
import accountRoutes from "./routes/accountRoutes";
import groupRoutes from "./routes/groupRoutes";
import followRoutes from "./routes/followRoutes";

export async function initServer(): Promise<express.Express> {
  const app = express();
  await postgres.connect();
  app.set("trust proxy", 1);

  app.set("port", process.env.PORT || 4000);
  app.use(cors());
  app.use(express.json());

  app.use(ROUTES.LOGIN, loginRateLimiter, loginRoutes);
  app.use(ROUTES.REGISTER, loginRateLimiter, registerRoutes);
  app.use(ROUTES.ACCOUNT, userRateLimiter, accountRoutes);
  app.use(ROUTES.GROUPS, userRateLimiter, groupRoutes);
  app.use(ROUTES.FOLLOW, userRateLimiter, followRoutes);

  return app;
}
