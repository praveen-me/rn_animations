import { DataTypes, Model } from "sequelize";
import dbConnection from "../db";

export class Movie extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public poster!: string;
}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    description: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    poster: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: "movies",
    sequelize: dbConnection, // passing the `sequelize` instance is required
  }
);
