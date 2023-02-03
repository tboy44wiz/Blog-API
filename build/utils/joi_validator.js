'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const roles = ['admin', 'user'];
const gategories = ['BackEnd', 'FrontEnd', 'MobileDev', 'DevOps', 'Others'];
const tags = ['HTML', 'CSS', 'JavaScript', 'NodeJS', 'ReactJS', 'VueJS', 'Svelte', 'Dart', 'Flutter', 'Java', 'Kotlin', 'Swift', 'Others'];

class JoiValidator {}

_defineProperty(JoiValidator, "userSignupSchema", _joi.default.object({
  name: _joi.default.string().required().min(3),
  phone: _joi.default.string().required(),
  email: _joi.default.string().required().email(),
  role: _joi.default.string().required().valid(...roles),
  description: _joi.default.string(),
  socialMedia: _joi.default.array(),
  picture: _joi.default.string(),
  password: _joi.default.string().required().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).error(new Error("Password must be at least 6 characters and alphanumeric."))
}));

_defineProperty(JoiValidator, "userUpdateSchema", _joi.default.object({
  name: _joi.default.string().min(3),
  phone: _joi.default.string(),
  email: _joi.default.string().email(),
  role: _joi.default.string().valid(...roles),
  description: _joi.default.string(),
  socialMedia: _joi.default.array(),
  password: _joi.default.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).error(new Error("Password must be at least 6 characters and alphanumeric."))
}));

_defineProperty(JoiValidator, "userLoginSchema", _joi.default.object({
  email: _joi.default.string().required().email(),
  password: _joi.default.string().required()
}));

_defineProperty(JoiValidator, "createBlogSchema", _joi.default.object({
  userId: _joi.default.string().required().uuid(),
  title: _joi.default.string().required(),
  body: _joi.default.string().required(),
  categories: _joi.default.string().required().valid(...gategories),
  tags: _joi.default.array().required(),
  isPublished: _joi.default.boolean().required()
}));

_defineProperty(JoiValidator, "updateBlogSchema", _joi.default.object({
  title: _joi.default.string(),
  body: _joi.default.string(),
  categories: _joi.default.string().valid(...gategories),
  tags: _joi.default.array(),
  isPublished: _joi.default.boolean()
}));

_defineProperty(JoiValidator, "createCommentSchema", _joi.default.object({
  blogId: _joi.default.string().required().uuid(),
  userId: _joi.default.string().required().uuid(),
  userName: _joi.default.string().required(),
  body: _joi.default.string().required(),
  replyTo: _joi.default.string().required()
}));

_defineProperty(JoiValidator, "updateCommentSchema", _joi.default.object({
  blogId: _joi.default.string().required().uuid(),
  userId: _joi.default.string().required().uuid(),
  userName: _joi.default.string(),
  body: _joi.default.string(),
  replyTo: _joi.default.string()
}));

_defineProperty(JoiValidator, "createLikeSchema", _joi.default.object({
  blogId: _joi.default.string().required().uuid(),
  userId: _joi.default.string().required().uuid()
}));

var _default = JoiValidator;
exports.default = _default;
//# sourceMappingURL=joi_validator.js.map