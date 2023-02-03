'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = _interopRequireDefault(require("../database/models"));

var _response = _interopRequireDefault(require("../utils/response"));

var _joi_validator = _interopRequireDefault(require("../utils/joi_validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  Comments
} = _models.default;

class CommentController {}

_defineProperty(CommentController, "createComment", async (req, res) => {
  try {
    const requestBody = req.body; //  Validate the Request Body.

    const {
      error,
      value
    } = _joi_validator.default.createCommentSchema.validate(requestBody);

    if (error) {
      const response = new _response.default(false, 400, `${error.message}`);
      return res.status(response.code).json(response);
    } //  Create Comment.


    const comment = await Comments.create({ ...value
    });

    if (!comment) {
      const response = new _response.default(false, 400, "Failed to create comment.");
      return res.status(response.code).json(response);
    }

    const response = new _response.default(true, 201, "Comment created successfully.", comment);
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, "Server error, please try again later.");
    res.status(response.code).json(response);
  }
});

_defineProperty(CommentController, "getSingleComment", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const comment = await Comments.findOne({
      where: {
        id
      }
    });

    if (!comment) {
      const response = new _response.default(false, 404, "No comment found.");
      return res.status(response.code).json(response);
    }

    const response = new _response.default(true, 200, "Comment retrieved successfully.", {
      comment
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, "Server error, please try again later.");
    return res.status(response.code).json(response);
  }
});

_defineProperty(CommentController, "getAllCommentsForParticularBlog", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const comments = await Comments.findAll({
      where: {
        blogId: id
      }
    });

    if (!comments.length) {
      const response = new _response.default(false, 404, "No comment found.");
      return res.status(response.code).json(response);
    }

    const response = new _response.default(true, 200, "Comments retrieved successfully.", {
      comments
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, "Server error, please try again later.");
    return res.status(response.code).json(response);
  }
});

_defineProperty(CommentController, "updateComment", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const requestBody = req.body; //  Validate the Request Body.

    const {
      error,
      value
    } = _joi_validator.default.updateCommentSchema.validate(requestBody);

    if (error) {
      const response = new _response.default(false, 400, `${error.message}`);
      return res.status(response.code).json(response);
    } //  Update Comment.


    const updatedComment = await Comments.update({ ...value
    }, {
      where: {
        id
      }
    });

    if (updatedComment[0] === 0) {
      const response = new _response.default(false, 400, "Failed to update comment.");
      return res.status(response.code).json(response);
    }

    const response = new _response.default(true, 200, "Comment updated successfully.");
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, "Server error, please try again later.");
    return res.status(response.code).json(response);
  }
});

_defineProperty(CommentController, "deleteComment", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const isDeleted = await Comments.destroy({
      where: {
        id
      }
    });

    if (isDeleted !== 1) {
      const response = new _response.default(false, 404, "No comment found.");
      return res.status(response.code).json(response);
    }

    const response = new _response.default(true, 200, "Comment deleted successfully.");
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, "Server error, please try again later.");
    return res.status(response.code).json(response);
  }
});

_defineProperty(CommentController, "default", async (req, res) => {
  try {
    const response = new _response.default(true, 200, "Leads retrieved successfully.", {});
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, "Server error, please try again later.");
    return res.status(response.code).json(response);
  }
});

var _default = CommentController;
exports.default = _default;
//# sourceMappingURL=comments_controller.js.map