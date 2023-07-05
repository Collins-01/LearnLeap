import { Router } from "express";
import AuthController from "./auth.controller";
import AuthValidators from "./middlewares/auth_validators";

export default class AuthRoutes {
  private readonly authController: AuthController = new AuthController();
  private readonly router: Router;
  private authValidators = new AuthValidators();
  constructor() {
    this.router = Router();

    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.post(
      "/login",
      this.authValidators.validateLoginRequest,
      this.authController.login
    );
    this.router.post(
      "/signup",
      this.authValidators.validateSignUpRequest,
      this.authController.signup
    );
    this.router.post(
      "/forgot-password",
      this.authValidators.validateForgotPasswordRequest,
      this.authController.forgotPassword
    );
    this.router.post(
      "/verify-otp",
      this.authValidators.validateVerifyOtpRequest,
      this.authController.verifyOTP
    );
  }

  public getRouter(): Router {
    return this.router;
  }

  public NAMESPACE = "/authentication";
}
