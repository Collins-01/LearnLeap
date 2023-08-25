import { Router } from "express";
import 'express-async-errors';
import CourseController from "./course.controller";
import CourseValidators from "./middlewares/course_validations";
import authMiddleware from "../middlewares/auth";
import creatorMiddleware from "../middlewares/creator_middleware";
export default class CourseRoutes {
  private readonly courseController = new CourseController();
  private readonly router: Router;
  private courseValidators = new CourseValidators();
  constructor() {
    this.router = Router();
    this.setupRoutes();
  }
  private setupRoutes(): void {
    /**
     * @openapi
     * /auth/login:
     *   post:
     *     summary: Log in with credentials
     *     description: Logs in a user using their email and password.
     *     tags:
     *       - Authentication
     *     requestBody:
     *       description: User credentials
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *             example:
     *               email: john@example.com
     *               password: mysecretpassword
     *     responses:
     *       200:
     *         description: Successfully logged in.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 accessToken:
     *                   type: string
     *               example:
     *                 accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
     *       401:
     *         description: Invalid credentials.
     *       
     * 
     * 
     * 
     * 
     * 
     */
    this.router.post(
      "/create",
      this.courseValidators.validateCreateCourseRequest,
      authMiddleware,
      creatorMiddleware,
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
      "/",
      authMiddleware,
      this.courseController.getAllCourses
    );
  }

  public getRouter(): Router {
    return this.router;
  }

  public NAMESPACE = "/course";
}
