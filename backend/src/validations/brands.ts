import Joi from "joi";

const createBrandValidation = Joi.object({
    name: Joi.string().required().messages({
        "string.base": "Verifytoken must be string character",
        "any.required": "Verifytoken required",
    }),
    tel: Joi.string().length(11).required().messages({
        "string.base": "Tel must be string character",
        "string.length": "Tel must have 11 characters",
        "any.required": "Tel required",
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Invalid email format",
        "any.required": "Email required",
    }),
    webSite: Joi.string().uri({scheme: ["http", "https"], allowRelative: true}).regex(/^(https?:\/\/)?(www\.)?([a-z0-9.-]+)\.([a-z]{2,})(:\d{1,5})?(\/.*)?$/i)
    .required().messages({
        'string.base': 'Website must be a string.',
        'string.empty': 'Website cannot be empty.',
        'string.uri': 'Website must be a valid URL.',
        'string.pattern.base': 'Website must be a valid URL format.',
        'any.required': 'Website is required.',
    }),
    address: Joi.string().required().messages({
        "string.base": "Verifytoken must be string character",
        "any.required": "Verifytoken required",
    }),
    storeUrl: Joi.string().required().messages({
        "string.base": "Verifytoken must be string character",
        "any.required": "Verifytoken required",
    }),
    logo: Joi.string().required().messages({
        "string.base": "Verifytoken must be string character",
        "any.required": "Verifytoken required",
    }),
})


export {
    createBrandValidation
}