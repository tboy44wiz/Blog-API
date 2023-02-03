'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _models = _interopRequireDefault(require("../database/models"));

var _response = _interopRequireDefault(require("../utils/response"));

var _joi_validator = _interopRequireDefault(require("../utils/joi_validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  Likes
} = _models.default;

class LikeController {}

_defineProperty(LikeController, "createAndDeleteLike", async (req, res) => {
  try {
    const {
      id
    } = req.requestPayload;
    const requestBody = req.body;
    console.log(id); //  Validate the Request Body.

    const {
      error,
      value
    } = _joi_validator.default.createLikeSchema.validate(requestBody);

    if (error) {
      const response = new _response.default(false, 400, `${error.message}`);
      return res.status(response.code).json(response);
    } //  Create a Like.


    const [like, created] = await Likes.findOrCreate({
      where: {
        blogId: value.blogId,
        userId: value.userId
      },
      defaults: { ...value
      }
    });

    if (!created) {
      //  Delete Like.
      await Likes.destroy({
        where: {
          blogId: value.blogId,
          userId: value.userId
        }
      }); //  Get the whole Likes count.

      const likes = await Likes.findAll();
      const response = new _response.default(true, 201, "Blog disliked successfully.", {
        likes: likes.length
      });
      return res.status(response.code).json(response);
    } //  Get the whole Likes count.


    const likes = await Likes.findAll();
    const response = new _response.default(true, 201, "Blog liked successfully.", {
      likes: likes.length
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, "Server error, please try again later.");
    res.status(response.code).json(response);
  }
});

var _default = LikeController;
exports.default = _default;
//# sourceMappingURL=likes_controller.js.map