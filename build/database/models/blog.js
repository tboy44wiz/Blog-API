'use strict';

var _uuid = require("uuid");

var _sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Blog extends _sequelize.Model {
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
    freezeTableName: true
  }); //  Before the Records will be created, let's d the following.

  Blog.beforeCreate(blog => {
    blog.id = (0, _uuid.v4)();
  });
  return Blog;
};
//# sourceMappingURL=blog.js.map