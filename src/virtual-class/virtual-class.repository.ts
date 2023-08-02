import { CreateVirtualClassDto } from "./dtos/create-virtual-class.dto";
import { IVirtualClasRepository } from "./interfaces/virtual-class-repository.interface";
import VirtualClass, { IVirtualClass } from "./schema/virtual-class";

export class VirtualClassRepository implements IVirtualClasRepository {
  createVirtualClass = async (
    dto: CreateVirtualClassDto,
    userId: string
  ): Promise<IVirtualClass | null> => {
    const data = new VirtualClass({
      ...dto,
      creatorId: userId,
    });

    const virtualClass = await data.save();
    return virtualClass;
  };
}
