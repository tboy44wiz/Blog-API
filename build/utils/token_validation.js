"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _response = _interopRequireDefault(require("./response"));

var _models = _interopRequireDefault(require("../database/models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  Users
} = _models.default;

class TokenValidation {}

_defineProperty(TokenValidation, "userTokenValidation", async (req, res, next) => {
  try {
    //  Get the token from the "Header, Query or Body" if available.
    const token = req.headers.authorization || req.headers['x-access-token'] || req.query.token || req.body.token;

    if (!token) {
      const response = new _response.default(false, 401, "Unauthorized, you did not provide any token.");
      return res.status(response.code).json(response);
    } //  Get the User "id".


    const {
      id
    } = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET_KEY); //  If Token exist, then make sure that the respective User exists in the DB.


    const user = await Users.findOne({
      where: {
        id
      },
      attributes: {
        exclude: ['password']
      }
    });

    if (!user) {
      const response = new _response.default(false, 401, "Unauthorized, this user does not exist.");
      return res.status(response.code).json(response);
    } //  Now append the decoded token to the the request body.


    req.requestPayload = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET_KEY);
    return next();
  } catch (error) {
    const response = new _response.default(false, 401, "Unauthorized, you have an invalid token.");
    return res.status(response.code).json(response);
  }
});

_defineProperty(TokenValidation, "others", async (req, res, next) => {
  try {
    const token = req.headers.authorization || req.headers['x-access-token'] || req.query.token || req.body.token;
  } catch (error) {
    const response = new _response.default(false, 401, "Unauthorized, you have an invalid token.");
    return res.status(response.code).json(response);
  }
});

var _default = TokenValidation;
exports.default = _default;
//# sourceMappingURL=token_validation.js.map