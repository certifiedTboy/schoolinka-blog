import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dbconfig";

class Blog extends Model {
  id: any;
  otherPublicField: any;
}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.STRING,
    },
  },
  { sequelize }
);

export default Blog;
