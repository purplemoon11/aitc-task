import { DataSource } from "typeorm";
import env from "./env";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.dbHost,
  port: parseInt(env.dbPort!),
  username: env.dbUserName,
  password: env.dbPassword ? env.dbPassword : "",
  database: env.dbName,
  entities: [`src/**/entities/*.entity{.ts,.js}`],
  logging: false,
  //@ts-ignore
  cli: {
    entitiesDir: "src/apps/**/*.entity{.ts,.js}",
  },
});
