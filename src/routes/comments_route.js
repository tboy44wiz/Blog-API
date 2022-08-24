'use strict';

import { Router } from "express";
import CommentController from "../controllers/comments_controller";

//  Set up Express Router.
const commentRouter = Router();


//  Create a Comment.
commentRouter.post(
    '/create_comment',
    CommentController.createComment,
);

//  Get a Single Comment.
commentRouter.get(
    '/single_commentt/:id',
    CommentController.getSingleComment,
);

//  Get all Comments for a Particular Post.
commentRouter.get(
    '/all_comments/:id',
    CommentController.getAllCommentsForParticularBlog,
);

//  Update a Comment.
commentRouter.put(
    '/update_comment/:id',
    CommentController.updateComment
);

//  Delete a Comment.
commentRouter.delete(
    '/delete_comment/:id',
    CommentController.deleteComment
);

export default commentRouter;