'use strict';
/*
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/dbConfig.js')[env];
const db = {};
*/

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var _dbConfig = _interopRequireDefault(require("../../config/dbConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const basename = _path.default.basename(__filename);

const env = process.env.NODE_ENV || 'development';
const config = _dbConfig.default[env];
const db = {};
let sequelize;

if (config.use_env_variable) {
  sequelize = new _sequelize.default(process.env[config.use_env_variable], config);
} else {
  sequelize = new _sequelize.default(config.database, config.username, config.password, config);
}

_fs.default.readdirSync(__dirname).filter(file => {
  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
}).forEach(file => {
  const model = require(_path.default.join(__dirname, file))(sequelize, _sequelize.default.DataTypes);

  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = _sequelize.default;
module.exports = db;
//# sourceMappingURL=index.js.map