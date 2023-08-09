import express, { Request, Response } from 'express'
import { User } from '../../models/users'
import { Token } from '../../models/tokens'
import { generateAuthCode } from '../../utils/helper'
import Mailer from '../../services/Mailer'
import { NotAuthorizedError } from '../../errors/not-authorized-error'
import path from 'path'
import fs from 'fs'

import validate from '../../middlewares/validate'
import { resetPasswordRequestValidation } from '../../validations/auth'

const router = express.Router()


router.post('/api/users/reset-password-request', validate(resetPasswordRequestValidation), async (req: Request, res: Response) => {
    const { email } = req.body

    const existingUser = await User.findOne({email})

    if(!existingUser) {
        throw new NotAuthorizedError('Not authorized')
    }

    const resetToken = generateAuthCode()

    const token = Token.build({resetToken, userId: existingUser._id})
    await token.save()

    const link = `http://localhost:3000?token=${token}&id=${existingUser.id}`

    const templatePath = path.join(__dirname, '..', '..', 'templates', 'reset-password.html')
    const emailTemplate = fs.readFileSync(templatePath, 'utf8')
    const templateReplaced = emailTemplate.replace(/{{name}}/g, existingUser.email).replace(/{{link}}/g, link)
    

    const mail = new Mailer('Reset Password Token', existingUser.email, link, templateReplaced)
    await mail.send()

    res.status(200).json({message: "Reset password link sent your email"})

})

export { router as resetPasswordRequestRouter }