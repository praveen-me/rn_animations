import { DataTypes, Model } from "sequelize";
import dbConnection from "../db";

export class Comment extends Model {
  public movieId!: number;
  public comment!: string;
  public timestamp!: Date;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    movieId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    content: {
      type: new DataTypes.STRING(1024),
      allowNull: false,
    },
  },
  {
    tableName: "comments",
    sequelize: dbConnection, // passing the `sequelize` instance is required
  }
);
