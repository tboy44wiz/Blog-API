"use strict";

import jwt from 'jsonwebtoken';
import Response from './response';
import models from '../database/models';

const { Users } = models;

class TokenValidation {

    //  User Token Verification.
    static userTokenValidation = async (req, res, next) => {
        try {

            //  Get the token from the "Header, Query or Body" if available.
            const token = req.headers.authorization ||
                req.headers['x-access-token'] ||
                req.query.token ||
                req.body.token;

            if (!token) {
                const response = new Response(
                    false,
                    401,
                    "Unauthorized, you did not provide any token."
                );
                return res.status(response.code).json(response);
            }

            //  Get the User "id".
            const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);

            //  If Token exist, then make sure that the respective User exists in the DB.
            const user = await Users.findOne({
                where: { id },
                attributes: {
                    exclude: ['password']
                }
            });
            if (!user) {
                const response = new Response(
                    false,
                    401,
                    "Unauthorized, this user does not exist.",
                );
                return res.status(response.code).json(response);
            }

            //  Now append the decoded token to the the request body.
            req.requestPayload = jwt.verify(token, process.env.JWT_SECRET_KEY);
            return next();

        } catch (error) {
            const response = new Response(
                false,
                401,
                "Unauthorized, you have an invalid token."
            );
            return res.status(response.code).json(response);
        }
    };


    //  Other Token Verification.
    static others = async (req, res, next) => {
        try {

            const token = req.headers.authorization ||
                req.headers['x-access-token'] ||
                req.query.token ||
                req.body.token;

        }catch (error) {
            const response = new Response(
                false,
                401,
                "Unauthorized, you have an invalid token."
            );
            return res.status(response.code).json(response);
        }
    };
}
export default TokenValidation;
