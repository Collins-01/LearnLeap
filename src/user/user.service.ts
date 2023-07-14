import User, { IUser } from "./user";

export default class UsersService {
  /**
   * name
   */
  public getUserById = async (id: string): Promise<IUser | null> => {
    const user = await User.findById(id);
    // console.log(user?.email);
    return user;
  };
}
