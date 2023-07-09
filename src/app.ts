import express, { Express, Router, Application ,NextFunction,Request,Response} from "express";
import AuthRoutes from "./auth/auth.routes";
import CourseRoutes from "./course/course.routes";
import errorMiddleware from "./middlewares/error_handler";

export default class App {
  private app: Application;
  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupRoutes(): void {
    const router = Router();
    const authRoutes = new AuthRoutes();
    const courseRoutes = new CourseRoutes();
    router.use(authRoutes.NAMESPACE, authRoutes.getRouter());
    router.use(courseRoutes.NAMESPACE, courseRoutes.getRouter());
    this.app.use("/api", router);
  }

  private setupMiddlewares(): void {
    // Parse JSON data
    this.app.use(express.json());
  }

  public getApp(): Application {
    return this.app;
  }

  private setupErrorHandling(): void {
    // Middleware for handling not found routes
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const error = new Error("Not Found");
      res.status(404).json({ error: "Route not found" });
    });
    this.app.use(errorMiddleware);
  }
}
