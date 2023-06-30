import { AuthService } from "./auth_service";
import { ForgotPasswordDTO } from "./dtos/forgot-password.dto";
import { LoginDto } from "./dtos/login.dto";
import SignupDTO from "./dtos/signup.dto";

export class AuthController {
  private authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  /**
   * login
   */
  public async login(dto: LoginDto) {
    return await this.authService.login(dto);
  }

  /**
   * signup
   */
  public async signup(dto: SignupDTO) {
    return await this.authService.signup(dto);
  }

  /**
   * forgotPassword
   */
  public async forgotPassword(dto: ForgotPasswordDTO) {
    return await this.authService.forgotPassword(dto);
  }
}
