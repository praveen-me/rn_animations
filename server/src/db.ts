import { Sequelize } from "sequelize";

const dbConnection = new Sequelize("supertal", "supertal", "supertal", {
  host: "localhost",
  dialect: "postgres",
  logging: true,
});

dbConnection
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

export default dbConnection;
