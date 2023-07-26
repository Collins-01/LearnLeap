import App from "./app";
import dotenv from "dotenv";
import DB from "./databsase/db";
import logger from "./utils/logger";

const bootstrap = async (includeDB: boolean) => {
  dotenv.config();
  if (includeDB) {
    logger.info("Starting server with Database connection.................");
    const db = new DB();
    await db.connect().then((_) => {
      console.log(`Database connected sucessfully`);
    });
  } else {
    logger.info("Starting server without Database connection...............");
    const app = new App().getApp();
    app.listen(3000, () => {
      console.log(`Server listening on port 3000`);
    });
  }
};

bootstrap(false);
