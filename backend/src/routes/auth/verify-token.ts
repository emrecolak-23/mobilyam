import express, {Request, Response } from 'express'
import add from "date-fns/add"
import jwt from 'jsonwebtoken'

import { User } from '../../models/users'
import { Token } from '../../models/tokens'

import { NotAuthorizedError } from '../../errors/not-authorized-error'
import { BadRequestError } from '../../errors/bad-request.error'

import validate from '../../middlewares/validate'
import { verifyTokenValidation } from '../../validations/auth'

const router = express.Router()

router.post('/api/auth/verify-token', validate(verifyTokenValidation), async (req: Request, res: Response) => {
    const {verifyToken, email} = req.body

    const tokenExpiration = add(new Date(), {
        minutes: 5
    })

    const existingUser = await User.findOne({email})

    if(!existingUser) {
        throw new NotAuthorizedError('Not authorized')
    }

    const tokens = await Token.find({userId: existingUser._id, createdAt: { $lt: tokenExpiration }})

    if(tokens.length === 0) {
        throw new BadRequestError('Invalid credentials')
    }

    const lastToken = tokens[tokens.length - 1]

    if(verifyToken !== lastToken.verifyToken) {
        throw new BadRequestError('Invalid credentials')
    }

    const userJwt = jwt.sign({
        id: existingUser._id,
        email: existingUser.email,
    }, process.env.JWT_KEY!)

    req.session = {
        jwt: userJwt
    }

    existingUser.isActive = true
    await existingUser.save()

    res.status(200).json({message: 'Email verification completed successful', user: existingUser})


})


export { router as verifyTokenRouter }