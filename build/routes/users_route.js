'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _token_validation = _interopRequireDefault(require("../utils/token_validation"));

var _users_controller = _interopRequireDefault(require("../controllers/users_controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  Set up Express Router.
const usersRouter = (0, _express.Router)(); //  SignUp User.

usersRouter.post('/signup', _users_controller.default.signUpUser); //  Login User.

usersRouter.post('/login', _users_controller.default.loginUser); //  Get all Users.

usersRouter.get('/single_user/:id', _users_controller.default.getSingleUser); //  Get a single User.

usersRouter.get('/all_users', _users_controller.default.getAllUsers); //  Update a User.

usersRouter.put('/update_user/:id', _token_validation.default.userTokenValidation, _users_controller.default.updateUser); //  Delete a User.

usersRouter.delete("/delete_user/:id", _token_validation.default.userTokenValidation, _users_controller.default.deleteUser);
var _default = usersRouter;
exports.default = _default;
//# sourceMappingURL=users_route.js.map