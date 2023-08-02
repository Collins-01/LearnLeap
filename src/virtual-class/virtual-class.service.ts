import { CreateVirtualClassDto } from "./dtos/create-virtual-class.dto";
import { IVirtualClasRepository } from "./interfaces/virtual-class-repository.interface";
import { VirtualClassRepository } from "./virtual-class.repository";

export class VirtualClassService {
  private virtualClassRepository: IVirtualClasRepository =
    new VirtualClassRepository();

  createVirtualClass = async (dto: CreateVirtualClassDto, userId: string) => {
    const result = await this.virtualClassRepository.createVirtualClass(
      dto,
      userId
    );
    return result;
  };
}
