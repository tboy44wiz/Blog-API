'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _comments_controller = _interopRequireDefault(require("../controllers/comments_controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  Set up Express Router.
const commentRouter = (0, _express.Router)(); //  Create a Comment.

commentRouter.post('/create_comment', _comments_controller.default.createComment); //  Get a Single Comment.

commentRouter.get('/single_commentt/:id', _comments_controller.default.getSingleComment); //  Get all Comments for a Particular Post.

commentRouter.get('/all_comments/:id', _comments_controller.default.getAllCommentsForParticularBlog); //  Update a Comment.

commentRouter.put('/update_comment/:id', _comments_controller.default.updateComment); //  Delete a Comment.

commentRouter.delete('/delete_comment/:id', _comments_controller.default.deleteComment);
var _default = commentRouter;
exports.default = _default;
//# sourceMappingURL=comments_route.js.map