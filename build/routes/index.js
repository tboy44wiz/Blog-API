'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _users_route = _interopRequireDefault(require("./users_route"));

var _blogs_route = _interopRequireDefault(require("./blogs_route"));

var _comments_route = _interopRequireDefault(require("./comments_route"));

var _likes_route = _interopRequireDefault(require("./likes_route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  Import all the required routes.
//  Initialize Express Router.
const router = (0, _express.Router)(); //  Use routes.

router.use('/users', _users_route.default);
router.use('/blogs', _blogs_route.default);
router.use('/comments', _comments_route.default);
router.use('/likes', _likes_route.default);
var _default = router;
exports.default = _default;
//# sourceMappingURL=index.js.map