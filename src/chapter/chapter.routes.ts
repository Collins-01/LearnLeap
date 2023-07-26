import { Router } from "express";
import ChaptersController from "./chapter.controller";
import ChapterValidators from "./middlewares/chapter-validator";
import authMiddleware from "../middlewares/auth";
export default class ChapterRoutes {
  private chapterController: ChaptersController;
  private router: Router;
  private chapterValidators = new ChapterValidators();

  constructor() {
    this.chapterController = new ChaptersController();
    this.router = Router();
    this.setUpRoutes();
  }

  private setUpRoutes = () => {
    this.router.post(
      "/create",
      this.chapterValidators.validateCreateChapterRequest,
      authMiddleware,
      this.chapterController.createChapter
    );

    this.router.get(
      "/:id",
      this.chapterValidators.validateSingleChapterRequest,
      authMiddleware,
      this.chapterController.getChapterById
    );
    this.router.delete(
      "/:id",
      this.chapterValidators.validateSingleChapterRequest,
      authMiddleware,
      this.chapterController.deleteChapter
    );

    this.router.get(
      "/:id",
      this.chapterValidators.validateSingleChapterRequest,
      authMiddleware,
      this.chapterController.getAllChaptersForCourse
    );
  };

  public NAMESPACE = "/chapter";
  public getRouter(): Router {
    return this.router;
  }
}
