import { VirtualClassService } from "./virtual-class.service";
import { Request, Response, NextFunction } from "express";

export class VirtualClassController {
  private virtualClassService: VirtualClassService;

  constructor() {
    this.virtualClassService = new VirtualClassService();
  }

  createVirtualClass = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.virtualClassService.createVirtualClass(
        request.body,
        request.user!.id
      );
      return response.status(201).json({
        message: "Successfully created class",
        data: {
          ...result,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}
