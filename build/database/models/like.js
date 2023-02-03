'use strict';

var _uuid = require("uuid");

var _sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Like extends _sequelize.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Like.belongsTo(models.Blogs, {
        as: "blog",
        foreignKey: "blogId",
        onDelete: "CASCADE"
      }); // Like.belongsTo(models.Comments, {
      //   as: "comment",
      //   foreignKey: "commentId",
      //   onDelete: "CASCADE"
      // });
    }

  }

  Like.init({
    blogId: DataTypes.UUID,
    userId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Likes',
    tableName: 'Likes',
    freezeTableName: true
  }); //  Before the Records will be created, let's do the following.

  Like.beforeCreate(like => {
    like.id = (0, _uuid.v4)();
  });
  return Like;
};
//# sourceMappingURL=like.js.map