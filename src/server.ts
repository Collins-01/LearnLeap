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
    const app = new App().getApp();
    app.listen(5000, () => {
      console.log(`Server listening on port 3000`);
    });
  } else {
    logger.info("Starting server without Database connection...............");
    const app = new App().getApp();
    app.listen(5000, () => {
      console.log(`Server listening on port 3000`);
    });
  }
};

bootstrap(true);
