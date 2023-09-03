import dotenv from "dotenv";

dotenv.config();

const { env } = process;

export default {
  APP_PORT: env.PORT || 3001,
  DB_NAME: env.DB_NAME,
  DB_USERNAME: env.DB_USERNAME,
  DB_PASSWORD: env.DB_PASSWORD,
};
