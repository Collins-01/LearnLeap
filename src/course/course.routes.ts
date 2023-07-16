import { Router } from "express";
import CourseController from "./course.controller";
import CourseValidators from "./middlewares/course_validations";
import authMiddleware from "../middlewares/auth";
export default class CourseRoutes {
  private readonly courseController = new CourseController();
  private readonly router: Router;
  private courseValidators = new CourseValidators();
  constructor() {
    this.router = Router();
    this.setupRoutes();
  }
  private setupRoutes(): void {
    this.router.post(
      "/create",
      this.courseValidators.validateCreateCourseRequest,
      authMiddleware,
      this.courseController.createCourse
    );

    this.router.get(
      "/:id",
      this.courseValidators.validateGetSingleCourseRequest,
      authMiddleware,
      this.courseController.getSingleCourseById
    );
    this.router.delete(
      "/:id",
      this.courseValidators.validateGetSingleCourseRequest,
      authMiddleware,
      this.courseController.deleteCourse
    );
    this.router.get(
      "/instructor/:id",
      this.courseValidators.validateGetSingleCourseRequest,
      authMiddleware,
      this.courseController.getAllCoursesByInstructor
    );
    this.router.get(
      "/all",
      authMiddleware,
      this.courseController.getAllCourses
    );
  }

  public getRouter(): Router {
    return this.router;
  }

  public NAMESPACE = "/course";
}
