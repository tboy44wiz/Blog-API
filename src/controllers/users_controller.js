'use strict';

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';

import models from '../database/models';
import Response from '../utils/response';
import JoiValidator from "../utils/joi_validator";

const { Users } = models;


class UserController {
    
    //  User SignUp.
    static signUpUser = async (req, res) => {
        try {

            const requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = JoiValidator.userSignupSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    409,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            //  Check if Staff already exist and create a new Staff using the "value" gotten from the validated object.
            const [user, created] = await Users.findOrCreate({
                where: { email: value.email },
                defaults: { ...value }
            });
            if (!created) {
                const response = new Response(
                    false,
                    409,
                    "User already exist."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                201,
                "Successfully created a user.",
                { user }
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
    };


    //  User Login.
    static loginUser = async (req, res) => {
        try {

            const requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = JoiValidator.userLoginSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            const user = await Users.findOne({
                where: { email: value.email },
                /*include: [
                    {
                        model: Blogs,
                        as: 'blogs'
                    }
                ]*/
            });

            if (!user) {
                const response = new Response(
                    false,
                    404,
                    "Email or Password is not correct."
                );
                return res.status(response.code).json(response);
            }

            //  Compare the encrypted password.
            const isPasswordMatched = bcrypt.compareSync(value.password, user.password );
            if (!isPasswordMatched) {
                const response = new Response(
                    false,
                    401,
                    "Incorrect password. Check your password or use 'Forget password' option."
                );
                return res.status(response.code).json(response);
            };

            const { id, name, phone, email, role } = user;

            //  Create a Token that will be passed to the response.
            const token = await jwt.sign(
                { id, name, phone, email, role },
                `${ process.env.JWT_SECRET_KEY }`,
                { expiresIn: "30d" }
            );

            //  Now remove the "password" before returning the User.
            const userDataValues = user.dataValues;
            delete userDataValues.password;

            const formattedResponse = {
                ...userDataValues,
                token
            }

            const response = new Response(
                true,
                200,
                "You're logged in successfully.",
                { ...formattedResponse }
            );
            res.status(response.code).json(response);

        }catch (error) {
            console.log(`ERROR::: ${ error }`);
            const response = new Response(
                false,
                500,
                "Server error, please try again later."
            );
            res.status(response.code).json(response);
        }
    };

    //  Get a single User.
    static getSingleUser = async (req, res) => {
        try {
            const { id } = req.params;

            const user = await Users.findOne({
                where: { id },
                attributes: {
                    exclude: ["password"]
                }
            });

            const response = new Response(
                true,
                200,
                'User retrieved successfully.',
                user
            );
            return res.status(response.code).json(response);

        } catch (error) {
            console.log(`ERROR::: ${error}`);

            const response = new Response(
                false,
                500,
                'Server error, please try again later.'
            );
            return res.status(response.code).json(response);
        }
    };

    //  Get all Users.
    static getAllUsers = async (req, res) => {
        try {
            const users = await Users.findAll({
                attributes: {
                    exclude: ['password']
                }
            });
            if (!users.length) {
                const response = new Response(
                    false,
                    404,
                    "No user found."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                'Users retrieved successfully.',
                users
            );
            return res.status(response.code).json(response);

        } catch (error) {
            console.log(`ERROR::: ${error}`);

            const response = new Response(
                false,
                500,
                'Server error, please try again later.'
            );
            return res.status(response.code).json(response);
        }
    };

    //  Update a User.
    static updateUser = async (req, res) => {
        try {
            const payload = req.requestPayload;
            const { id } = req.params;
            const requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = await JoiValidator.userUpdateSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            //  First check if a record has the email existing.
            if (value.email) {
                const foundItem = await Users.findOne({
                    where: { email: value.email }
                });
                if (foundItem) {
                    const response = new Response(
                        false,
                        400,
                        "Email already been used."
                    );
                    return res.status(response.code).json(response);
                }
            }

            //  If No record found with the same email, then update.
            const updatedUser = await Users.update({ ...value }, { where: { id } });
            if (updatedUser[0] === 0) {
                const response = new Response(
                    false,
                    400,
                    "Failed to update user."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                "User updated successfully."
            );
            return res.status(response.code).json(response);

        } catch (error) {
            console.log(`ERROR::: ${error}`);

            const response = new Response(
                false,
                500,
                'Server error, please try again later.'
            );
            return res.status(response.code).json(response);
        }
    };

    //  Delete a User.
    static deleteUser = async (req, res) => {
        try {
            const { id } = req.params;

            const isDeleted = await Users.destroy({
                where: { id }
            });
            if (isDeleted !== 1) {
                const response = new Response(
                    false,
                    404,
                    "No user found."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                "User deleted successfully."
            );
            return res.status(response.code).json(response);

        } catch (error) {
            console.log(`ERROR::: ${error}`);

            const response = new Response(
                false,
                500,
                'Server error, please try again later.'
            );
            return res.status(response.code).json(response);
        }
    };
}

export default UserController;