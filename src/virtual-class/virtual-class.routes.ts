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

    this.router.post(
        "/generate-token",
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
