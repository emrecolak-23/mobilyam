import express, { Request, Response } from 'express'
import requireAuth from '../../middlewares/require-auth'
import validate from '../../middlewares/validate'
import { changePasswordValidation } from '../../validations/auth'

import { User } from '../../models/users'

import Mailer from '../../services/Mailer'

import { NotAuthorizedError } from '../../errors/not-authorized-error'
import { BadGateWayError } from '../../errors/bad-gateway-error'


const router = express.Router()


router.post('/api/auth/change-password', requireAuth, validate(changePasswordValidation), async (req: Request, res: Response) => {

    const { password } = req.body

    try {

        const user = await User.findOne({_id: req.currentUser?.id})

        if(!user) {
            throw new NotAuthorizedError()
        }

        await User.updateOne({
            _id: user._id
        }, {
            $set: {
                password
            }
        })

        const mail = new Mailer('Password Changed', user.email, 'Your password changed')
        await mail.send()

        res.status(200).json({message: 'Your password changed'})

    } catch(err) {

        throw new BadGateWayError

    }

})


export { router as changePasswordRouter }