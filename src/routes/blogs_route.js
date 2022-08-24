'use strict';

import { Router } from "express";
import TokenValidation from '../utils/token_validation'
import BlogController from "../controllers/blogs_controller";

//  Set up Express Router.
const blogRouter = Router();


//  Create a Blog.
blogRouter.post(
    '/create_blog',
    TokenValidation.userTokenValidation,
    BlogController.createBlog,
);

//  Get a Single Blog.
blogRouter.get(
    '/single_blog/:id',
    BlogController.getSingleBlog,
);

//  Get All Blogs.
blogRouter.get(
    '/all_blogs',
    BlogController.getAllBlogs,
);

//  Update a Blog.
blogRouter.put(
    '/update_blog/:id',
    TokenValidation.userTokenValidation,
    BlogController.updateBlog
);

//  Delete a Blog.
blogRouter.delete(
    '/delete_blog/:id',
    TokenValidation.userTokenValidation,
    BlogController.deleteBlog
);

export default blogRouter;