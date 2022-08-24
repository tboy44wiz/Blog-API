'use strict';

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';

import models from '../database/models';
import Response from '../utils/response';
import JoiValidator from "../utils/joi_validator";

const { Likes } = models;

class LikeController {

    //  Create & Delete a Like.
    static createAndDeleteLike = async (req, res) => {
        try {

            const { id } = req.requestPayload;
            const requestBody = req.body;
            console.log(id);

            //  Validate the Request Body.
            const { error, value } = JoiValidator.createLikeSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            //  Create a Like.
            const [like, created] = await Likes.findOrCreate({
                where: { blogId: value.blogId, userId: value.userId },
                defaults: { ...value }
            });
            
            if (!created) {

                //  Delete Like.
                await Likes.destroy({ where: { blogId: value.blogId, userId: value.userId } });

                //  Get the whole Likes count.
                const likes = await Likes.findAll();
                const response = new Response(
                    true,
                    201,
                    "Blog disliked successfully.",
                    { likes: likes.length }
                );
                return res.status(response.code).json(response);
            }

            //  Get the whole Likes count.
            const likes = await Likes.findAll();
            const response = new Response(
                true,
                201,
                "Blog liked successfully.",
                { likes: likes.length }
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
}


export default LikeController;