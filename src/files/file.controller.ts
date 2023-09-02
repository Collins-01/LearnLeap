import FileService from "./file.service";
import { Request, Response, NextFunction } from "express";
import { FileType } from "./schema/file";
import logger from "../utils/logger";

export default class FileController {
  private fileService: FileService;

  constructor() {
    this.fileService = new FileService();
  }

  /**
   * uploadSingleFile
   */
  public uploadSingleFile = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    console.log(`File from request : ${JSON.stringify(request.body)}`);

    // const data = await this.fileService.uploadFile(
    //   request.file!,
    //   FileType.IMAGE
    // );
    try {
      return response.status(200).json({
        message: "Successfully uploaded  file",
        // data,
      });
    } catch (error) {
      console.log(`Uloading file: ${error}`);
      next(error);
    }
  };
}
