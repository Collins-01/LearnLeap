import IUserRepository from "../user/interfaces/user_repository_interface";
import { LoginDto } from "./dtos/login.dto";
import bcrypt from "bcrypt";
import SignupDTO from "./dtos/signup.dto";
import { IUser } from "../user/user";
import { MailService } from "../mail/mail.service";
import { ForgotPasswordDTO } from "./dtos/forgot-password.dto";
import { VerifyOtpDTO } from "./dtos/verify_otp.dto";
export class AuthService {
  private userRepository: IUserRepository;
  private mailService: MailService;
  constructor(userRepository: IUserRepository, mailService: MailService) {
    this.userRepository = userRepository;
    this.mailService = mailService;
  }

  /**
   * login
   */
  public async login(dto: LoginDto) {
    return `Login Data ${JSON.stringify(dto)}`;
    // const user = await this.userRepository.findByEmail(dto.email);
    // if (!user) {
    //   throw new Error("User not found");
    // }
    // if (!user.isVerified) {
    //   throw new Error("User account not verified");
    // }
    // const isMatch = await bcrypt.compare(user.password, dto.password);
    // if (!isMatch) {
    //   // Throw incorrect password...
    // }
  }

  /**
   * signup
   */
  public async signup(dto: SignupDTO) {
    return `Signup Data ${JSON.stringify(dto)}`;
    // const userExists = await this.userRepository.findByEmail(dto.email);
    // if (userExists) {
    //   throw new Error("User already exists");
    // }
    // try {
    //   const data = {};
    //   const user = await this.userRepository.save(data);
    //   await this.mailService.sendMail({
    //     body: "",
    //     to: "",
    //     from: "",
    //   });
    //   //   Send OTP to email
    //   return `An Email has been sendt to ${user.email}, it expires in 5 minutes`;
    // } catch (error) {
    //   throw new Error(`Failed to create user: ${error?.message}`);
    // }
  }

  /**
   * forgotPassword
   */
  public async forgotPassword(dto: ForgotPasswordDTO) {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new Error("No user found with tgis emaul.");
    }
    // GENERATE OTP AND SENd
    await this.mailService.sendMail({
      body: "",
      from: "",
      to: "",
    });

    return `An OTP has been sent to yput email address`;
  }
  


  /**
   * verifyOTP
   */
  public verifyOTP(dto:VerifyOtpDTO) {
    // Check if the email address exists in the cache
    // Check if the time has expired
    // Check if the supposed user has already been verified.
    // verify if the code matches that of the cache.
  }
}
