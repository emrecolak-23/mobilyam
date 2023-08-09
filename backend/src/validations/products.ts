import Joi from 'joi'


const createProductValidation = Joi.object({
    name: Joi.string().required().messages({
        "string.base": "Verifytoken must be string character",
        "any.required": "Verifytoken required",
    }),
    description: Joi.string().required().messages({
        "string.base": "Verifytoken must be string character",
        "any.required": "Verifytoken required",
    }),
    price: Joi.number().min(0).required().messages({
        "number.base": "Price must be number",
        "number.min": "Price must be higher than {{limit}}",
        "any.required": "Verifytoken required",
    }),
    url: Joi.string().required().messages({
        "string.base": "Verifytoken must be string character",
        "any.required": "Verifytoken required",
    }),
    model: Joi.string().required().messages({
        "string.base": "Verifytoken must be string character",
        "any.required": "Verifytoken required",
    }),
    brandId: Joi.string().required().messages({
        "string.base": "Verifytoken must be string character",
        "any.required": "Verifytoken required",
    })
})

const updateProductValidation = Joi.object({
    name: Joi.string().required().messages({
        "string.base": "Verifytoken must be string character",
        "any.required": "Verifytoken required",
    }),
    description: Joi.string().required().messages({
        "string.base": "Verifytoken must be string character",
        "any.required": "Verifytoken required",
    }),
    price: Joi.number().min(0).required().messages({
        "number.base": "Price must be number",
        "number.min": "Price must be higher than {{limit}}",
        "any.required": "Verifytoken required",
    }),
    url: Joi.string().required().messages({
        "string.base": "Verifytoken must be string character",
        "any.required": "Verifytoken required",
    }),
})

const updateProductAdminValidation = Joi.object({
    name: Joi.string().required().messages({
        "string.base": "Verifytoken must be string character",
        "any.required": "Verifytoken required",
    }),
    description: Joi.string().required().messages({
        "string.base": "Verifytoken must be string character",
        "any.required": "Verifytoken required",
    }),
    price: Joi.number().min(0).required().messages({
        "number.base": "Price must be number",
        "number.min": "Price must be higher than {{limit}}",
        "any.required": "Verifytoken required",
    }),
    url: Joi.string().required().messages({
        "string.base": "Verifytoken must be string character",
        "any.required": "Verifytoken required",
    }),
    model: Joi.string().required().messages({
        "string.base": "Verifytoken must be string character",
        "any.required": "Verifytoken required",
    }),
})



export {
    createProductValidation,
    updateProductValidation,
    updateProductAdminValidation
}