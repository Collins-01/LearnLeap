import App from "./app";
import dotenv from "dotenv";
import DB from "./databsase/db";



const bootstrap = async () => {
  dotenv.config();
  const db = new DB();
  await db.connect().then((_) => {
    console.log(`Database connected sucessfully`)
    const app = new App().getApp();
    app.listen(3000, () => {
      
      console.log(`Server listening on port 3000`);
    });
  });
};

bootstrap();
