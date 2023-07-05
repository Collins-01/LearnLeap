import mongoose, { Mongoose } from "mongoose";

export default class DB {
  /**
   * connect
   */
  public async connect() {
    const url = process.env.MONGO_URI;
    return await mongoose.connect(url!, {}).catch((error) => {
      console.log(`Error Connecting to DB::: ${error}`);
    });
  }
}
