import Joi from "joi";

const signupValidation = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Invalid email format",
        "any.required": "Email required",
    }),
    password: Joi.string().min(6).required().messages({
        "string.base": "Password must be string character",
        "string.min": "Password must be at {{limit}} at character",
        "any.required": "Password required",
    })
})

const signinValidation = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Invalid email format",
        "any.required": "Email required",
    }),
    password: Joi.string().min(6).required().messages({
        "string.base": "Password must be string character",
        "string.min": "Password must be at {{limit}} at character",
        "any.required": "Password required",
    })
})

const verifyTokenValidation = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Invalid email format",
        "any.required": "Email required",
    }),
    verifyToken: Joi.string().min(6).required().messages({
        "string.base": "Verifytoken must be string character",
        "string.min": "Verifytoken must be at {{limit}} at character",
        "any.required": "Verifytoken required",
    })
})

const resetPasswordRequestValidation = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Invalid email format",
        "any.required": "Email required",
    }),
})

const resetPasswordVadalition = Joi.object({
    id: Joi.string().required().messages({
        "string.base": "Verifytoken must be string character",
        "any.required": "Verifytoken required",
    }),
    token: Joi.string().required().messages({
        "string.base": "Verifytoken must be string character",
        "any.required": "Verifytoken required",
    }),
    password: Joi.string().min(6).required().messages({
        "string.base": "Password must be string character",
        "string.min": "Password must be at {{limit}} at character",
        "any.required": "Password required",
    })
})

const changePasswordValidation = Joi.object({
    password: Joi.string().min(6).required().messages({
        "string.base": "Password must be string character",
        "string.min": "Password must be at {{limit}} at character",
        "any.required": "Password required",
    })
})


export {
    signinValidation,
    signupValidation,
    verifyTokenValidation,
    resetPasswordRequestValidation,
    resetPasswordVadalition,
    changePasswordValidation
}

