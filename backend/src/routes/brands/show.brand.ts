import express, {Request, Response } from 'express'
import requireAuth from '../../middlewares/require-auth'

import { User } from '../../models/users'
import { Brand } from '../../models/brands'

import { NotAuthorizedError } from '../../errors/not-authorized-error'
import { BadGateWayError } from '../../errors/bad-gateway-error'

const router = express.Router()

router.get('/api/brands/show', requireAuth, async (req: Request, res: Response) => {

    try {

        const user = await User.findById(req.currentUser?.id)

        const existingBrand = await Brand.findOne({_id: user!.brandId!})

        if(!existingBrand) {
            throw new NotAuthorizedError('Not authorized')
        }

        res.status(200).json({brand: existingBrand})


    } catch(err) {
        
        throw new BadGateWayError()

    }
    

})

export { router as showBrandUserRouter }