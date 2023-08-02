import { UserRole } from "../user/schema/user";
import { AgoraService } from "./agora.service";
import { GenerateTokenDTO } from "./dtos/generate-token.dto";
import { VirtualClassService } from "./virtual-class.service";
import { Request, Response, NextFunction } from "express";

export class VirtualClassController {
  private virtualClassService: VirtualClassService;
  private agoraService: AgoraService;

  constructor() {
    this.virtualClassService = new VirtualClassService();
    this.agoraService = new AgoraService();
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

  generateToken = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      //
      const dto: GenerateTokenDTO = {
        classId: request.params.classId,
        className: request.params.className,
        role: request.params.role as UserRole,
      };
      const result = await this.agoraService.generateToken(
        dto,
        request.user!.id
      );

      return response.status(200).json({
        message: "Successfully generated token",
        data: {
          token: result,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}
