'use strict';

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _uuid = require("uuid");

var _sequelize = require("sequelize");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (sequelize, DataTypes) => {
  class User extends _sequelize.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Blogs, {
        as: "blogs",
        foreignKey: "userId",
        onDelete: "CASCADE"
      });
    }

  }

  ;
  User.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('admin', 'user'),
    description: DataTypes.TEXT,
    socialMedia: DataTypes.ARRAY(DataTypes.STRING),
    picture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'Users',
    freezeTableName: true
  }); //  Before the Records will be created, let's d the following.

  User.beforeCreate(user => {
    user.id = (0, _uuid.v4)();
  });
  User.beforeCreate(user => {
    user.password = _bcryptjs.default.hashSync(user.password, 10);
  }); //  After the record is persisted and before the persisted data are returned, let's remove the "password".

  User.afterCreate(user => {
    delete user.dataValues.password;
  });
  return User;
};
//# sourceMappingURL=user.js.map