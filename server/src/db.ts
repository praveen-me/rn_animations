import { Sequelize } from "sequelize";

const dbConnection = new Sequelize("supertal", "supertal", "supertal", {
  host: "localhost",
  dialect: "postgres",
  logging: true,
});

export default dbConnection;
