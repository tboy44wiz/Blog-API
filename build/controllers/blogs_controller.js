'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _models = _interopRequireDefault(require("../database/models"));

var _response = _interopRequireDefault(require("../utils/response"));

var _joi_validator = _interopRequireDefault(require("../utils/joi_validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  Blogs,
  Users,
  Likes,
  Comments
} = _models.default;

class BlogController {}

_defineProperty(BlogController, "createBlog", async (req, res) => {
  try {
    const requestBody = req.body; //  Validate the Request Body.

    const {
      error,
      value
    } = _joi_validator.default.createBlogSchema.validate(requestBody);

    if (error) {
      const response = new _response.default(false, 400, `${error.message}`);
      return res.status(response.code).json(response);
    } //  Create a Blog.


    const [blog, created] = await Blogs.findOrCreate({
      where: {
        title: value.title
      },
      defaults: { ...value
      }
    });

    if (!created) {
      const response = new _response.default(false, 409, "Blog already exist.");
      return res.status(response.code).json(response);
    }

    const response = new _response.default(true, 201, "Blog created successfully.", blog);
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, "Server error, please try again later.");
    res.status(response.code).json(response);
  }
});

_defineProperty(BlogController, "getSingleBlog", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const blog = await Blogs.findOne({
      where: {
        id
      },
      attributes: {
        include: [[_sequelize.default.literal('COUNT(DISTINCT(likes))'), 'likesCount'], [_sequelize.default.literal('COUNT(DISTINCT(comments))'), 'commentsCount']]
      },
      include: [{
        model: Users,
        as: "author",
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"]
        }
      }, {
        model: Likes,
        as: "likes",
        attributes: []
      }, {
        model: Comments,
        as: "comments",
        attributes: []
      }],
      group: ["Blogs.id", "author.id"]
    });

    if (!blog) {
      const response = new _response.default(false, 404, "No blog found.");
      return res.status(response.code).json(response);
    }

    const response = new _response.default(true, 200, "Blog retrieved successfully.", blog);
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, "Server error, please try again later.");
    return res.status(response.code).json(response);
  }
});

_defineProperty(BlogController, "getAllBlogs", async (req, res) => {
  try {
    const blogs = await Blogs.findAll({
      attributes: {
        include: [[_sequelize.default.literal('COUNT(DISTINCT(likes))'), 'likesCount'], [_sequelize.default.literal('COUNT(DISTINCT(comments))'), 'commentsCount']]
      },
      include: [{
        model: Users,
        as: 'author',
        attributes: ["id", "name"]
      }, {
        model: Likes,
        as: "likes",
        attributes: []
      }, {
        model: Comments,
        as: "comments",
        attributes: []
      }],
      group: ["Blogs.id", "author.id"]
    });

    if (!blogs.length) {
      const response = new _response.default(false, 404, "No blog found.");
      return res.status(response.code).json(response);
    }

    const response = new _response.default(true, 200, "Blogs retrieved successfully.", blogs);
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, "Server error, please try again later.");
    return res.status(response.code).json(response);
  }
});

_defineProperty(BlogController, "updateBlog", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const {
      role
    } = req.requestPayload;
    const requestBody = req.body;

    if (role !== "admin") {
      const response = new _response.default(false, 401, `You are not permitted to update this blog.`);
      return res.status(response.code).json(response);
    } //  Validate the Request Body.


    const {
      error,
      value
    } = _joi_validator.default.updateBlogSchema.validate(requestBody);

    if (error) {
      const response = new _response.default(false, 400, `${error.message}`);
      return res.status(response.code).json(response);
    } //  Update Blog.


    const updatedBlog = await Blogs.update({ ...value
    }, {
      where: {
        id
      }
    });

    if (updatedBlog[0] === 0) {
      const response = new _response.default(false, 400, "Failed to update blog.");
      return res.status(response.code).json(response);
    }

    const response = new _response.default(true, 200, "Blog updated successfully.");
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, "Server error, please try again later.");
    return res.status(response.code).json(response);
  }
});

_defineProperty(BlogController, "deleteBlog", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const isDeleted = await Blogs.destroy({
      where: {
        id
      }
    });

    if (isDeleted !== 1) {
      const response = new _response.default(false, 404, "No blog found.");
      return res.status(response.code).json(response);
    }

    const response = new _response.default(true, 200, "Blog deleted successfully.");
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, "Server error, please try again later.");
    return res.status(response.code).json(response);
  }
});

_defineProperty(BlogController, "default", async (req, res) => {
  try {
    const response = new _response.default(true, 200, "Leads retrieved successfully.", {});
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, "Server error, please try again later.");
    return res.status(response.code).json(response);
  }
});

var _default = BlogController;
exports.default = _default;
//# sourceMappingURL=blogs_controller.js.map