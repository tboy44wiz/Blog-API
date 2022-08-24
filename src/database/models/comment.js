'use strict';


import { v4 as uuidV4 } from 'uuid';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
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
      });

      // Comment.hasMany(models.Likes, {
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
    freezeTableName: true,
  });


  //  Before the Records will be created, let's d the following.
  Comment.beforeCreate((comment) => {
    comment.id = uuidV4();
  });

  return Comment;
};