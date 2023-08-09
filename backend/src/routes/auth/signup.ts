import express, { Request, Response } from 'express'
import { BadRequestError } from '../../errors/bad-request.error'
import { User } from '../../models/users'
import { Token } from '../../models/tokens'

import validate from '../../middlewares/validate'
import { signupValidation } from '../../validations/auth'

import Mailer from '../../services/Mailer'

import { generateAuthCode } from '../../utils/helper'

const router = express.Router()

router.post('/api/auth/signup', validate(signupValidation), async (req: Request, res: Response) => {
    const {email, password} = req.body

    const existingUser = await User.findOne({email})

    if(existingUser?.isActive) {
       throw new BadRequestError('Email in use')
    }

    const user = (!existingUser) ? User.build({email, password}) : existingUser
    
    if(!existingUser) await user.save()


    const verifyToken = generateAuthCode()

    const token = Token.build({verifyToken, userId: user._id})
    await token.save()

    const mail = new Mailer('Authenticate Token', user.email, verifyToken)
    await mail.send()


    res.status(201).json({message: 'Email verification code sent your email'})
})

export { router as signupRouter }