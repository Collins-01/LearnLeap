import { Router } from "express";
import { AuthController } from "./auth_controller";
import { AuthService } from "./auth_service";
import { UserRepository } from "../user/user_repository";
import { MailService } from "../mail/mail.service";

const router = Router();
const authController = new AuthController(
  new AuthService(new UserRepository(), new MailService())
);

router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.post("/forgot-password", authController.forgotPassword);

module.exports = router;
