import express, { Express, Router } from "express";
import AuthRoutes from "../auth/auth_routes";

export default class App {
  private readonly app: Express;
  constructor() {
    this.app = express();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    const router = Router();
    const authRoutes = new AuthRoutes();
    router.use(authRoutes.NAMESPACE, authRoutes.getRouter());

    this.app.use("/api", router);
  }
}
