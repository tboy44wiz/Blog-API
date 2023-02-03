'use strict';

var _uuid = require("uuid");

var _sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Comment extends _sequelize.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.Blogs, {
        as: "blog",
        foreignKey: "blogId",
        onDelete: "CASCADE"
      }); // Comment.hasMany(models.Likes, {
      //   as: "likes",
      //   foreignKey: "commentId",
      //   onDelete: "CASCADE"
      // })
    }

  }

  Comment.init({
    blogId: DataTypes.UUID,
    userId: DataTypes.UUID,
    userName: DataTypes.STRING,
    body: DataTypes.TEXT,
    replyTo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comments',
    tableName: 'Comments',
    freezeTableName: true
  }); //  Before the Records will be created, let's d the following.

  Comment.beforeCreate(comment => {
    comment.id = (0, _uuid.v4)();
  });
  return Comment;
};
//# sourceMappingURL=comment.js.map