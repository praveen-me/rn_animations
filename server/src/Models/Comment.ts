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
    movie_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    comment: {
      type: new DataTypes.STRING(1024),
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "comments",
    sequelize: dbConnection,
    timestamps: false,
  }
);

export default Comment;
