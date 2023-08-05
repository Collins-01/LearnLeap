import authMiddleware from "../middlewares/auth";
import creatorMiddleware from "../middlewares/creator_middleware";
import { VirtualClassController } from "./virtual-class.controller";
import { Router } from "express";

export class VirtualClassRoutes {
  private virtualClassController = new VirtualClassController();
  private readonly router: Router;
  constructor() {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.post(
      "/create-class",
      //   this..validateCreateCourseRequest,
      authMiddleware,
      creatorMiddleware,
      this.virtualClassController.createVirtualClass
    );

    // app.get('/rtc/:channel/:role/:tokentype/:uid', nocache , generateRTCToken)
    this.router.get(
      "/generate-token/:className/:classId/:role/:tokentype/:uid",
      //   this..validateCreateCourseRequest,
      authMiddleware,
      creatorMiddleware,
      this.virtualClassController.createVirtualClass
    );
  }

  public getRouter(): Router {
    return this.router;
  }

  public NAMESPACE = "/virtual-class";
}
