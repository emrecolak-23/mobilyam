import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { Password } from '../../services/Password'
import validate from '../../middlewares/validate'
import { signinValidation } from '../../validations/auth'

import { User } from '../../models/users'

import { NotAuthorizedError } from '../../errors/not-authorized-error'
import { BadRequestError } from '../../errors/bad-request.error'
const router = express.Router()


router.post('/api/auth/signin', validate(signinValidation), async (req: Request, res: Response) => {

    const { email, password } = req.body

    const existingUser = await User.findOne({email})

    if(!existingUser || !existingUser.isActive) {
        throw new NotAuthorizedError('Not authorized')
    }

    const passwordMatch = await Password.compare(existingUser.password!, password)

    if(!passwordMatch) {
        throw new BadRequestError('Invalid credentails')
    }

    const userJwt = jwt.sign({
        id: existingUser._id,
        email: existingUser.email,
    }, process.env.JWT_KEY!)

    req.session = {
        jwt: userJwt
    }

    res.status(200).send(existingUser)

})

export { router as signinRouter }