import IUserRepository from "./interfaces/user_repository.interface";
import User, { IUser } from "./user";

export class UserRepository implements IUserRepository {
  findById(id: string): Promise<IUser> {
    throw new Error("Method not implemented.");
  }
  findByEmail = async (email: string): Promise<IUser | null> => {
    return null;
  };
  save(user: IUser): Promise<IUser> {
    throw new Error("Method not implemented.");
  }
  update(user: IUser): Promise<IUser> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
