import Joi from "joi";

export const VocabEntity = Joi.object({
    userId: Joi.string().required(),
    eng: Joi.string().required(),
    vnese: Joi.array().items(Joi.string()).required(),
    example: Joi.array().items(Joi.string()),
    note: Joi.string(),
    type: Joi.array().items(Joi.string()),
    synonyms: Joi.array().items(Joi.string()),
})