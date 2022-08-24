'use strict';

import Joi from 'joi';

const roles = ['admin', 'user'];
const gategories = ['BackEnd', 'FrontEnd', 'MobileDev', 'DevOps', 'Others']
const tags = ['HTML', 'CSS' ,'JavaScript', 'NodeJS', 'ReactJS', 'VueJS', 'Svelte', 'Dart', 'Flutter', 'Java', 'Kotlin', 'Swift', 'Others'];

class JoiValidator {

    /*=====================================================================================*/
    /*=================================== FOR USERS =====================================*/
    //  Users Validation Schema.
    static userSignupSchema = Joi.object({
        name: Joi.string().required().min(3),
        phone: Joi.string().required(),
        email: Joi.string().required().email(),
        role: Joi.string().required().valid(...roles),
        description: Joi.string(),
        socialMedia: Joi.array(),
        picture: Joi.string(),
        password: Joi.string().required()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .error(new Error("Password must be at least 6 characters and alphanumeric."))
    });

    //  Users Update Validation Schema.
    static userUpdateSchema = Joi.object({
        name: Joi.string().min(3),
        phone: Joi.string(),
        email: Joi.string().email(),
        role: Joi.string().valid(...roles),
        description: Joi.string(),
        socialMedia: Joi.array(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .error(new Error("Password must be at least 6 characters and alphanumeric."))
    });

    //  User Login Validation Schema.
    static userLoginSchema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });



    /*=====================================================================================*/
    /*=================================== FOR BLOGS =====================================*/
    //  Blogs Validation Schema.
    static createBlogSchema = Joi.object({
        userId: Joi.string().required().uuid(),
        title: Joi.string().required(),
        body: Joi.string().required(),
        categories: Joi.string().required().valid(...gategories),
        tags: Joi.array().required(),
        isPublished: Joi.boolean().required()
    });


    //  Blogs Update Validation Schema.
    static updateBlogSchema = Joi.object({
        title: Joi.string(),
        body: Joi.string(),
        categories: Joi.string().valid(...gategories),
        tags: Joi.array(),
        isPublished: Joi.boolean()
    });



    /*=====================================================================================*/
    /*=================================== FOR COMMENTS =====================================*/
    //  Comments Validation Schema.
    static createCommentSchema = Joi.object({
        blogId: Joi.string().required().uuid(),
        userId: Joi.string().required().uuid(),
        userName: Joi.string().required(),
        body: Joi.string().required(),
        replyTo: Joi.string().required()
    });


    //  Comments Update Validation Schema.
    static updateCommentSchema = Joi.object({
        blogId: Joi.string().required().uuid(),
        userId: Joi.string().required().uuid(),
        userName: Joi.string(),
        body: Joi.string(),
        replyTo: Joi.string()
    });



    /*=====================================================================================*/
    /*=================================== FOR LIKES =====================================*/
    //  Likes Validation Schema.
    static createLikeSchema = Joi.object({
        blogId: Joi.string().required().uuid(),
        userId: Joi.string().required().uuid(),
    });

}

export default JoiValidator;