import { Router } from "express";
import CourseController from "./course.controller";
import CourseValidators from "./middlewares/course_validations";
import authMiddleware from "../middlewares/auth";
export default class CourseRoutes {
  private readonly courseController = new CourseController();
  private readonly router: Router;
  private authValidators = new CourseValidators();
  constructor() {
    this.router = Router();
    this.setupRoutes();
  }
  private setupRoutes(): void {
    this.router.post(
      "/create",
      this.authValidators.validateCreateCourseRequest,
      authMiddleware,
      this.courseController.createCourse
    );
    
  }

  public getRouter(): Router {
    return this.router;
  }

  public NAMESPACE = "/course";
}
