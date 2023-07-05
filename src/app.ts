import express, {
  Express,
  Router,
  Request,
  Response,
  NextFunction,
} from "express";
import AuthRoutes from "./auth/auth.routes";
import { CustomAPIError } from "./errors/cutsom-error";
import { StatusCodes } from "http-status-codes";

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
    router.use(authRoutes.NAMESPACE, authRoutes.getRouter());

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
    this.app.use(this.errorHandlerMiddleware);
  }

  private errorHandlerMiddleware(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (err instanceof CustomAPIError) {
      return res.status(400).json({ msg: err.message });
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Something went wrong try again later");
  }
}
