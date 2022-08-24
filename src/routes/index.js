'use strict';

import { Router } from "express";

//  Import all the required routes.
import userRouter from "./users_route";
import blogsRouter from "./blogs_route";
import commentRouter from "./comments_route";
import likeRouter from "./likes_route";


//  Initialize Express Router.
const router = Router();


//  Use routes.
router.use('/users', userRouter);
router.use('/blogs', blogsRouter);
router.use('/comments', commentRouter);
router.use('/likes', likeRouter);

export default router;