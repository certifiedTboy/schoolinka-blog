import http from "http";
import app from "./app";
import PostgreSqlConnector from "./database/dbconfig/dbConnection";
import config from "./config";

const server = http.createServer(app);

const PORT = config.APP_PORT;

const startServer = async () => {
  const dbConnector = new PostgreSqlConnector();
  await dbConnector.connect();
  server.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
  });
};

startServer();
