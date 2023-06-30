import { Router } from "express";
import { AuthController } from "./auth_controller";
import { AuthService } from "./auth_service";
import { UserRepository } from "../user/user_repository";
import { MailService } from "../mail/mail.service";

export default class AuthRoutes {
  private readonly authController: AuthController;
  private readonly router: Router;
  constructor() {
    this.router = Router();
    this.authController = new AuthController(
      new AuthService(new UserRepository(), new MailService())
    );
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.post("/login", this.authController.login);
    this.router.post("/signup", this.authController.signup);
    this.router.post("/forgot-password", this.authController.forgotPassword);
  }

  public getRouter(): Router {
    return this.router;
  }

  public NAMESPACE = "/authentication";
}
