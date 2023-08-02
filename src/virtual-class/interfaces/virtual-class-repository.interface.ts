import { CreateVirtualClassDto } from "../dtos/create-virtual-class.dto";
import { IVirtualClass } from "../schema/virtual-class";

export interface IVirtualClasRepository {
  createVirtualClass(
    dto: CreateVirtualClassDto,
    userId: string
  ): Promise<IVirtualClass | null>;
}
