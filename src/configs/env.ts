import dotenv from "dotenv";

dotenv.config();

export default {
  // app
  port: process.env.PORT,

  // database
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUserName: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,

  // secrets
  jwtTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,

  //swagger
  swaggerDev: process.env.DEV_SWAGGER_URI,
};
