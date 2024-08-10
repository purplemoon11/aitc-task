import { AppDataSource } from "./src/configs/database";
import app from "./src/index";
import env from "./src/configs/env";

AppDataSource.initialize()
  .then(() => console.log("Database connected successfully !!!"))
  .catch((err) => console.log("Cannot connect to database !!!", err));
app.listen(env.port, () => {
  console.log(`Server is running on port: ${env.port}`);
});
