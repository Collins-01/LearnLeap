import App from "./app/app";

const app = new App().getApp();

app.listen(3000, () => {
  console.log(`Server listening on port 3000`);
});
