import { sequelize } from "./index";
import { IDatabaseConnector } from "../../interfaces";

/**
 * @class PostgreSqlConnector
 */
export default class PostgreSqlConnector implements IDatabaseConnector {
  /**
   * @instance
   * @name connect
   * @param url
   * @memberof PostgreSqlConnector
   * @desc connects to postgreSql database
   */
  async connect() {
    sequelize
      .authenticate()
      .then(() => {
        console.log("database connected");
      })
      .catch((error) => {
        console.error("Unable to connect to the database: ", error);
      });

    await sequelize.sync({ force: false });
  }
}
