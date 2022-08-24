'use strict';

import { Router } from "express";
import TokenValidation from '../utils/token_validation'
import UsersController from "../controllers/users_controller";

//  Set up Express Router.
const usersRouter = Router();


//  SignUp User.
usersRouter.post(
    '/signup', 
    UsersController.signUpUser
);

//  Login User.
usersRouter.post(
    '/login', 
    UsersController.loginUser
);

//  Get all Users.
usersRouter.get(
    '/single_user/:id', 
    UsersController.getSingleUser
);

//  Get a single User.
usersRouter.get(
    '/all_users', 
    UsersController.getAllUsers
);

//  Update a User.
usersRouter.put(
    '/update_user/:id',
    TokenValidation.userTokenValidation,
    UsersController.updateUser
);

//  Delete a User.
usersRouter.delete(
    "/delete_user/:id",
    TokenValidation.userTokenValidation,
    UsersController.deleteUser
);

export default usersRouter;