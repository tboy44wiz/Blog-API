'use strict';

import { Router } from "express";
import TokenValidation from '../utils/token_validation'
import LikeController from "../controllers/likes_controller";

//  Set up Express Router.
const likeRouter = Router();


//  Create & Delete a Like.
likeRouter.post(
    '/create_and_delete_like',
    TokenValidation.userTokenValidation,
    LikeController.createAndDeleteLike,
);

export default likeRouter;