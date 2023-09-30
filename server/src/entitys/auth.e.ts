import Joi from "joi";

export const LoginEntity = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
})

export const RegisterEntity = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
})