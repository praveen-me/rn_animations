import { Sequelize } from "sequelize";

console.log(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  "env"
);

const dbConnection = new Sequelize(
  process.env.POSTGRES_DB as string,
  process.env.POSTGRES_USER as string,
  process.env.POSTGRES_PASSWORD as string,
  {
    host: "localhost",
    dialect: "postgres",
    logging: true,
  }
);

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
