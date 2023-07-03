import { Request, Response } from "express";
import { AuthService } from "./auth_service";

export class AuthController {
  private authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  /**
   * login
   */
  public async login(request: Request, response: Response) {
    console.log(`Request Body: ${JSON.stringify(request.body)}`);
    const data = await this.authService.login(request.body);
    return response.status(200).json({
      message: "Successfully logged in",
      data,
    });
  }

  /**
   * signup
   */
  public async signup(request: Request, response: Response) {
    const data = await this.authService.signup(request.body);
    return response.status(201).json({
      message: "User created successfully",
      data,
    });
  }

  /**
   * forgotPassword
   */
  public async forgotPassword(request: Request, response: Response) {
    const data = await this.authService.forgotPassword(request.body);
    return response.status(200).json({
      message: "Success",
      data,
    });
  }

  /**
   * verifyOTP
   */
  public async verifyOTP(request: Request, response: Response) {
    const data = await this.authService.verifyOTP(request.body);
    return response.status(200).json({
      message: "Account successsfully verified ",
      data,
    });
  }
}
