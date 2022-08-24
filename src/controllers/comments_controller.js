'use strict';

import models from '../database/models';
import Response from '../utils/response';
import JoiValidator from "../utils/joi_validator";

const { Comments } = models;

class CommentController {

    //  Create a Comment.
    static createComment = async (req, res) => {
        try {

            const requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = JoiValidator.createCommentSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            //  Create Comment.
            const comment = await Comments.create({ ...value });
            if (!comment) {
                const response = new Response(
                    false,
                    400,
                    "Failed to create comment."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                201,
                "Comment created successfully.",
                comment,
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


    //  Get a Single Comment.
    static getSingleComment = async (req, res) => {
        try {

            const { id } = req.params;

            const comment = await Comments.findOne({
                where: { id },
            });
            if (!comment) {
                const response = new Response(
                    false,
                    404,
                    "No comment found.",
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                "Comment retrieved successfully.",
                { comment }
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
    

    //  Get all Comments for a Particular Blog.
    static getAllCommentsForParticularBlog = async (req, res) => {
        try {

            const { id } = req.params;

            const comments = await Comments.findAll({
                where: { blogId: id }
            });
            if (!comments.length) {
                const response = new Response(
                    false,
                    404,
                    "No comment found.",
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                "Comments retrieved successfully.",
                { comments },
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


    //  Update a Comment.
    static updateComment = async (req, res) => {
        try {

            const { id } = req.params;
            const  requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = JoiValidator.updateCommentSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            //  Update Comment.
            const updatedComment = await Comments.update({ ...value }, { where: { id } });
            if (updatedComment[0] === 0) {
                const response =  new Response(
                    false,
                    400,
                    "Failed to update comment."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                "Comment updated successfully.",
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


    //  Delete a Comment.
    static deleteComment = async (req, res) => {
        try {

            const { id } = req.params;

            const isDeleted = await Comments.destroy({ where: { id } });
            if (isDeleted !== 1) {
                const response = new Response(
                    false,
                    404,
                    "No comment found."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                "Comment deleted successfully.",
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


export default CommentController;