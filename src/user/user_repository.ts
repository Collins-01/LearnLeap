import IUserRepository from "./interfaces/user_repository_interface";
import { IUser } from "./user";


export class UserRepository implements IUserRepository {
    findById(id: string): Promise<IUser> {
        throw new Error("Method not implemented.");
    }
    findByEmail(email: string): Promise<IUser> {
        throw new Error("Method not implemented.");
    }
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