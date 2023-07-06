import express, {
  Express,
  Router,
  Request,
  Response,
  NextFunction,
} from "express";
import AuthRoutes from "./auth/auth.routes";
import CourseRoutes from "./course/course.routes";

export default class App {
  private readonly app: Express = express();
  constructor() {
    this.setupMiddleware();
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

  private setupMiddleware(): void {
    // Parse JSON data
    this.app.use(express.json());
  }

  public getApp(): Express {
    return this.app;
  }

  private setupErrorHandling(): void {
    // Middleware for handling not found routes
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const error = new Error("Not Found");
      res.status(404).json({ error: "Route not found" });
    });
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        console.log(`Request: ${req.body}`);
        return res.status(500).json({ msg: err.message });
      }
    );
  }
}
