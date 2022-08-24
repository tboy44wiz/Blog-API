'use strict';

import Sequelize from 'sequelize';
import models from '../database/models';
import Response from '../utils/response';
import JoiValidator from "../utils/joi_validator";

const { Blogs, Users, Likes, Comments } = models;

class BlogController {

    //  Create a Blog.
    static createBlog = async (req, res) => {
        try {

            const requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = JoiValidator.createBlogSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            //  Create a Blog.
            const [blog, created] = await Blogs.findOrCreate({
                where: { title: value.title },
                defaults: { ...value }
            });
            if (!created) {
                const response = new Response(
                    false,
                    409,
                    "Blog already exist."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                201,
                "Blog created successfully.",
                blog,
            );
            return res.status(response.code).json(response);


        } catch (error) {
            console.log(`ERROR::: ${ error }`);
            const response = new Response(
                false,
                500,
                "Server error, please try again later."
            );
            res.status(response.code).json(response);
        }
    }


    //  Get a Single Blog.
    static getSingleBlog = async (req, res) => {
        try {

            const { id } = req.params;

            const blog = await Blogs.findOne({
                where: { id },
                attributes: {
                    include: [
                        [Sequelize.literal('COUNT(DISTINCT(likes))'), 'likesCount'],
                        [Sequelize.literal('COUNT(DISTINCT(comments))'), 'commentsCount'],
                    ]
                },
                include: [
                    {
                        model: Users,
                        as: "author",
                        attributes: {
                            exclude: ["password", "createdAt", "updatedAt"]
                        }
                    },
                    {
                        model: Likes,
                        as: "likes",
                        attributes: []
                    },
                    {
                        model: Comments,
                        as: "comments",
                        attributes: []
                    }
                ],
                group: ["Blogs.id", "author.id"]
            });
            if (!blog) {
                const response = new Response(
                    false,
                    404,
                    "No blog found.",
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                "Blog retrieved successfully.",
                blog
            );
            return res.status(response.code).json(response);

        } catch (error) {
            console.log(`ERROR::: ${ error }`);
            const response = new Response(
                false,
                500,
                "Server error, please try again later.",
            );
            return res.status(response.code).json(response);
        }
    }
    

    //  Get all Blogs.
    static getAllBlogs = async (req, res) => {
        try {
            const blogs = await Blogs.findAll({
                attributes: {
                    include: [
                        [Sequelize.literal('COUNT(DISTINCT(likes))'), 'likesCount'],
                        [Sequelize.literal('COUNT(DISTINCT(comments))'), 'commentsCount'],
                    ]
                },
                include: [
                    {
                        model: Users,
                        as: 'author',
                        attributes: ["id", "name"],
                    },
                    {
                        model: Likes,
                        as: "likes",
                        attributes: []
                    },
                    {
                        model: Comments,
                        as: "comments",
                        attributes: []
                    }
                ],
                group: ["Blogs.id", "author.id"]
            });
            if (!blogs.length) {
                const response = new Response(
                    false,
                    404,
                    "No blog found.",
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                "Blogs retrieved successfully.",
                blogs,
            );
            return res.status(response.code).json(response);

        } catch (error) {
            console.log(`ERROR::: ${ error }`);
            const response = new Response(
                false,
                500,
                "Server error, please try again later.",
            );
            return res.status(response.code).json(response);
        }
    };


    //  Update a Blog.
    static updateBlog = async (req, res) => {
        try {

            const { id } = req.params;
            const { role } = req.requestPayload;
            const  requestBody = req.body;

            if (role !== "admin") {
                const response = new Response(
                    false,
                    401,
                    `You are not permitted to update this blog.`
                );
                return res.status(response.code).json(response);
            }

            //  Validate the Request Body.
            const { error, value } = JoiValidator.updateBlogSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            //  Update Blog.
            const updatedBlog = await Blogs.update({ ...value }, { where: { id } });
            if (updatedBlog[0] === 0) {
                const response =  new Response(
                    false,
                    400,
                    "Failed to update blog."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                "Blog updated successfully.",
            );
            return res.status(response.code).json(response);

        } catch (error) {
            console.log(`ERROR::: ${ error }`);
            const response = new Response(
                false,
                500,
                "Server error, please try again later.",
            );
            return res.status(response.code).json(response);
        }
    };


    //  Delete a Blog.
    static deleteBlog = async (req, res) => {
        try {

            const { id } = req.params;

            const isDeleted = await Blogs.destroy({ where: { id } });
            if (isDeleted !== 1) {
                const response = new Response(
                    false,
                    404,
                    "No blog found."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                "Blog deleted successfully.",
            );
            return res.status(response.code).json(response);

        } catch (error) {
            console.log(`ERROR::: ${ error }`);
            const response = new Response(
                false,
                500,
                "Server error, please try again later.",
            );
            return res.status(response.code).json(response);
        }
    };


    //  Default.
    static default = async (req, res) => {
        try {

            const response = new Response(
                true,
                200,
                "Leads retrieved successfully.",
                {  },
            );
            return res.status(response.code).json(response);

        } catch (error) {
            console.log(`ERROR::: ${ error }`);
            const response = new Response(
                false,
                500,
                "Server error, please try again later.",
            );
            return res.status(response.code).json(response);
        }
    };
}


export default BlogController;