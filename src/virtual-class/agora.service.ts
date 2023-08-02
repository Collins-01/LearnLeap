import { RtcTokenBuilder, RtcRole } from "agora-access-token";
import { GenerateTokenDTO } from "./dtos/generate-token.dto";
import { IVirtualClasRepository } from "./interfaces/virtual-class-repository.interface";
import { VirtualClassRepository } from "./virtual-class.repository";
import { NotFoundRequestError } from "../errors";
import logger from "../utils/logger";
import HttpException from "../errors/base-http-exception";
export class AgoraService {
  private virtualClassRepository: IVirtualClasRepository =
    new VirtualClassRepository();
  generateToken = async (dto: GenerateTokenDTO, userId: string) => {
    const classInfo = await this.virtualClassRepository.getClassById(
      dto.classId
    );
    if (!classInfo) {
      throw new NotFoundRequestError("No class with this id exists");
    }

    try {
      const role =
        dto.role == "student" ? RtcRole.SUBSCRIBER : RtcRole.PUBLISHER;
      const appId = process.env.APP_ID!;
      const appCert = process.env.APP_CERTIFICATE!;
      const token = RtcTokenBuilder.buildTokenWithAccount(
        appId,
        appCert,
        dto.className,
        userId,
        role,
        classInfo.duration
      );
      return token;
    } catch (error) {
      logger.error(`Error Creating Token: ${error}`);
      throw new HttpException(500, "Error generating token.");
    }
  };
}
