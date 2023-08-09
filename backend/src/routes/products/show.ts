import express, { Request, Response } from 'express'
import requireAuth from '../../middlewares/require-auth'

import { User } from '../../models/users'
import { Product } from '../../models/products'

import { NotAuthorizedError } from '../../errors/not-authorized-error'
import { BadGateWayError } from '../../errors/bad-gateway-error'

const router = express.Router()


router.post('/api/products/show', requireAuth, async (req: Request, res: Response) => {

    const {id} = req.body

    try {

        const user = await User.findOne({_id: req.currentUser?.id})
        const product = await Product.findById(id)


        if (user?.role === 'admin' || user?.role === 'superAdmin') {
        
          return res.status(200).json(product)
        
        } 

        if(user?.brandId !== product?.brandId) {
            throw new NotAuthorizedError()
        }


        res.status(200).json(product)

    } catch(err) {
        throw new BadGateWayError()
    }


})

export { router as showProductRouter }