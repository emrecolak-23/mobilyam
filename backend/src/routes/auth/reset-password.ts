import express, { Request, Response } from 'express'
import { User } from '../../models/users'
import { Token } from '../../models/tokens'

import { NotAuthorizedError } from '../../errors/not-authorized-error'

import validate from '../../middlewares/validate'
import { resetPasswordVadalition } from '../../validations/auth'

const router = express.Router()


router.post('/api/users/reset-password', validate(resetPasswordVadalition), async (req: Request, res: Response) => {
    const { id, token, password } = req.body

    const existingUser = await User.findOne({id})

    if(!existingUser) {
        throw new NotAuthorizedError('Not authorized')
    }

    const existingToken = await Token.findOne({resetToken: token})

    if(!existingToken) {
        throw new NotAuthorizedError('Not authorized')
    }

    existingUser.password = password
    await existingUser.save()

    res.status(200).json({message: "Your passwor reset successfully"})


})

export { router as resetPasswordRouter }