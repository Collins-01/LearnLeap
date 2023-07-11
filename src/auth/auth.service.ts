import { LoginDto } from "./dtos/login.dto";
import bcrypt from "bcrypt";
import SignupDTO from "./dtos/signup.dto";
import User, { IUser } from "../user/user";
import { ForgotPasswordDTO } from "./dtos/forgot-password.dto";
import { VerifyOtpDTO } from "./dtos/verify_otp.dto";
import { BadRequestError } from "../errors/bad-request-error";

import jwt from "jsonwebtoken";
import { ForbiddenRequestError } from "../errors/forbidden-request-error";
import { NotFoundRequestError } from "../errors/not-found-request-error";
type JWTPayload = {
  id: string;
  email: string;
};
export default class AuthService {
  /**
   * login
   */
  public async login(dto: LoginDto) {
    const email = dto.email;
    const user = await User.findOne({
      email,
    });
    if (!user) {
      throw new BadRequestError("No user found");
    }
    if (!user.isVerified) {
      throw new ForbiddenRequestError(
        "User account has not been verified, please verify your account and try again."
      );
    }
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new ForbiddenRequestError("Invalid credentials");
    }

    const jwtSecret = process.env.JWT_SECRET as string;
    const tokenPayload: JWTPayload = {
      email: user.email,
      id: user._id,
    };
    const token = jwt.sign(tokenPayload, jwtSecret!);

    const data = {
      user: user.toJSON(),
      token: {
        token,
        expiry: Date.now().toFixed()
      },
    };

    return data;
  }

  /**
   * signup
   */
  public async signup(dto: SignupDTO) {
    const email = dto.email;
    const user = await User.findOne({
      email,
    });
    if (user) {
      throw new ForbiddenRequestError("User already exists");
    }
    try {
      const hash = await bcrypt.hash(dto.password, 10);
      const data = new User({
        email: dto.email,
        firstName: dto.first_name,
        lastName: dto.last_name,
        role: dto.role,
        password: hash,
      });
      const userInfo = await data.save();
      console.log(`New User Create ::::: ${JSON.stringify(userInfo)}`);
      // const data = {};

      //   Send OTP to email
      return `An Email has been sendt to ${dto.email}, it expires in 5 minutes`;
    } catch (error) {
      throw new Error(`Failed to create user: ${error}`);
    }
  }

  /**
   * forgotPassword
   */
  public async forgotPassword(dto: ForgotPasswordDTO) {
    const email = dto.email;
    const user = await User.findOne({
      email,
    });
    if (!user) {
      throw new NotFoundRequestError("No user found.");
    }
    // const user = await this.userRepository.findByEmail(dto.email);
    // if (!user) {
    //   throw new Error("No user found with tgis emaul.");
    // }
    // GENERATE OTP AND SENd
    // await this.mailService.sendMail({
    //   body: "",
    //   from: "",
    //   to: "",
    // });

    return `An OTP has been sent to yput email address`;
  }

  /**
   * verifyOTP
   */
  public verifyOTP = async (dto: VerifyOtpDTO) => {
    const email = dto.email;
    const filter = { email }; // Replace with the user's email
    const update = { $set: { isVerified: true } }; // Update the isEmailVerified field to true
    const result = await User.updateOne(filter, update);

    console.log(JSON.stringify(result));
    if (result.modifiedCount === 1) {
      return `Account verified successfully.`;
    }
    throw new NotFoundRequestError(`No user found with email ${email}`);
    // if (result.isVerified) {
    //   throw new ForbiddenRequestError(`User has already verified email`);
    // }

    // Check if the email address exists in the cache
    // Check if the time has expired
    // Check if the supposed user has already been verified.
    // verify if the code matches that of the cache.
  };
}
