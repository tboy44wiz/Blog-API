'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _token_validation = _interopRequireDefault(require("../utils/token_validation"));

var _likes_controller = _interopRequireDefault(require("../controllers/likes_controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  Set up Express Router.
const likeRouter = (0, _express.Router)(); //  Create & Delete a Like.

likeRouter.post('/create_and_delete_like', _token_validation.default.userTokenValidation, _likes_controller.default.createAndDeleteLike);
var _default = likeRouter;
exports.default = _default;
//# sourceMappingURL=likes_route.js.map