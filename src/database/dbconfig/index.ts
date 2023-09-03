import { Sequelize } from "sequelize-typescript";
import config from "../../config";

export const sequelize = new Sequelize({
  database: config.DB_NAME,
  dialect: "postgres",
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  storage: ":memory:",
  models: [__dirname + "../models/Blog"],
});
