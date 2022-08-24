'use strict';


import { v4 as uuidV4 } from 'uuid';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Blog.belongsTo(models.Users, {
        as: "author",
        foreignKey: "userId",
        onDelete: "CASCADE"
      });

      Blog.hasMany(models.Likes, {
        as: "likes",
        foreignKey: "blogId",
        onDelete: "CASCADE"
      });

      Blog.hasMany(models.Comments, {
        as: "comments",
        foreignKey: "blogId",
        onDelete: "CASCADE"
      });
    }
  }
  Blog.init({
    userId: DataTypes.UUID,
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    categories: DataTypes.ENUM('BackEnd', 'FrontEnd', 'MobileDev', 'DevOps', 'Others'),
    tags: DataTypes.ARRAY(DataTypes.STRING),
    // largeImage: DataTypes.STRING,
    // thumNailImage: DataTypes.STRING,
    isPublished: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Blogs',
    tableName: 'Blogs',
    freezeTableName: true,
  });


  //  Before the Records will be created, let's d the following.
  Blog.beforeCreate((blog) => {
    blog.id = uuidV4();
  });


  return Blog;
};