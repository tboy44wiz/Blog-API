'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _token_validation = _interopRequireDefault(require("../utils/token_validation"));

var _blogs_controller = _interopRequireDefault(require("../controllers/blogs_controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  Set up Express Router.
const blogRouter = (0, _express.Router)(); //  Create a Blog.

blogRouter.post('/create_blog', _token_validation.default.userTokenValidation, _blogs_controller.default.createBlog); //  Get a Single Blog.

blogRouter.get('/single_blog/:id', _blogs_controller.default.getSingleBlog); //  Get All Blogs.

blogRouter.get('/all_blogs', _blogs_controller.default.getAllBlogs); //  Update a Blog.

blogRouter.put('/update_blog/:id', _token_validation.default.userTokenValidation, _blogs_controller.default.updateBlog); //  Delete a Blog.

blogRouter.delete('/delete_blog/:id', _token_validation.default.userTokenValidation, _blogs_controller.default.deleteBlog);
var _default = blogRouter;
exports.default = _default;
//# sourceMappingURL=blogs_route.js.map