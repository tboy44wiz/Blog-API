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
  Users
} = _models.default;

class UserController {}

_defineProperty(UserController, "signUpUser", async (req, res) => {
  try {
    const requestBody = req.body; //  Validate the Request Body.

    const {
      error,
      value
    } = _joi_validator.default.userSignupSchema.validate(requestBody);

    if (error) {
      const response = new _response.default(false, 409, `${error.message}`);
      return res.status(response.code).json(response);
    } //  Check if Staff already exist and create a new Staff using the "value" gotten from the validated object.


    const [user, created] = await Users.findOrCreate({
      where: {
        email: value.email
      },
      defaults: { ...value
      }
    });

    if (!created) {
      const response = new _response.default(false, 409, "User already exist.");
      return res.status(response.code).json(response);
    }

    const response = new _response.default(true, 201, "Successfully created a user.", {
      user
    });
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, "Server error, please try again later.");
    res.status(response.code).json(response);
  }
});

_defineProperty(UserController, "loginUser", async (req, res) => {
  try {
    const requestBody = req.body; //  Validate the Request Body.

    const {
      error,
      value
    } = _joi_validator.default.userLoginSchema.validate(requestBody);

    if (error) {
      const response = new _response.default(false, 400, `${error.message}`);
      return res.status(response.code).json(response);
    }

    const user = await Users.findOne({
      where: {
        email: value.email
      }
      /*include: [
          {
              model: Blogs,
              as: 'blogs'
          }
      ]*/

    });

    if (!user) {
      const response = new _response.default(false, 404, "Email or Password is not correct.");
      return res.status(response.code).json(response);
    } //  Compare the encrypted password.


    const isPasswordMatched = _bcryptjs.default.compareSync(value.password, user.password);

    if (!isPasswordMatched) {
      const response = new _response.default(false, 401, "Incorrect password. Check your password or use 'Forget password' option.");
      return res.status(response.code).json(response);
    }

    ;
    const {
      id,
      name,
      phone,
      email,
      role
    } = user; //  Create a Token that will be passed to the response.

    const token = await _jsonwebtoken.default.sign({
      id,
      name,
      phone,
      email,
      role
    }, `${process.env.JWT_SECRET_KEY}`, {
      expiresIn: "30d"
    }); //  Now remove the "password" before returning the User.

    const userDataValues = user.dataValues;
    delete userDataValues.password;
    const formattedResponse = { ...userDataValues,
      token
    };
    const response = new _response.default(true, 200, "You're logged in successfully.", { ...formattedResponse
    });
    res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, "Server error, please try again later.");
    res.status(response.code).json(response);
  }
});

_defineProperty(UserController, "getSingleUser", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const user = await Users.findOne({
      where: {
        id
      },
      attributes: {
        exclude: ["password"]
      }
    });
    const response = new _response.default(true, 200, 'User retrieved successfully.', user);
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});

_defineProperty(UserController, "getAllUsers", async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: {
        exclude: ['password']
      }
    });

    if (!users.length) {
      const response = new _response.default(false, 404, "No user found.");
      return res.status(response.code).json(response);
    }

    const response = new _response.default(true, 200, 'Users retrieved successfully.', users);
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});

_defineProperty(UserController, "updateUser", async (req, res) => {
  try {
    const payload = req.requestPayload;
    const {
      id
    } = req.params;
    const requestBody = req.body; //  Validate the Request Body.

    const {
      error,
      value
    } = await _joi_validator.default.userUpdateSchema.validate(requestBody);

    if (error) {
      const response = new _response.default(false, 400, `${error.message}`);
      return res.status(response.code).json(response);
    } //  First check if a record has the email existing.


    if (value.email) {
      const foundItem = await Users.findOne({
        where: {
          email: value.email
        }
      });

      if (foundItem) {
        const response = new _response.default(false, 400, "Email already been used.");
        return res.status(response.code).json(response);
      }
    } //  If No record found with the same email, then update.


    const updatedUser = await Users.update({ ...value
    }, {
      where: {
        id
      }
    });

    if (updatedUser[0] === 0) {
      const response = new _response.default(false, 400, "Failed to update user.");
      return res.status(response.code).json(response);
    }

    const response = new _response.default(true, 200, "User updated successfully.");
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});

_defineProperty(UserController, "deleteUser", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const isDeleted = await Users.destroy({
      where: {
        id
      }
    });

    if (isDeleted !== 1) {
      const response = new _response.default(false, 404, "No user found.");
      return res.status(response.code).json(response);
    }

    const response = new _response.default(true, 200, "User deleted successfully.");
    return res.status(response.code).json(response);
  } catch (error) {
    console.log(`ERROR::: ${error}`);
    const response = new _response.default(false, 500, 'Server error, please try again later.');
    return res.status(response.code).json(response);
  }
});

var _default = UserController;
exports.default = _default;
//# sourceMappingURL=users_controller.js.map