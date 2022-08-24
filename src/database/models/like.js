'use strict';


import { v4 as uuidV4 } from 'uuid';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
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
      });
      // Like.belongsTo(models.Comments, {
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
    freezeTableName: true,
  });


  //  Before the Records will be created, let's do the following.
  Like.beforeCreate((like) => {
    like.id = uuidV4();
  });

  return Like;
};