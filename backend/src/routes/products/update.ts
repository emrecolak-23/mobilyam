import express, { Request, Response } from 'express'
import requireAuth from '../../middlewares/require-auth'
import validate from '../../middlewares/validate'
import { updateProductValidation } from '../../validations/products'

import { Product } from '../../models/products'
import { NotFoundError } from '../../errors/not-found-error'
import { BadGateWayError } from '../../errors/bad-gateway-error'

const router = express.Router()

router.patch('/api/products/update/:id', requireAuth, validate(updateProductValidation), async (req: Request, res: Response) => {
    
    const { id } = req.params
    const { name, description, price, url} = req.body
    

    try {

        const product = await Product.findOne({_id: id})
        
        if(!product) {
            throw new NotFoundError()
        }

        product.name = name
        product.description = description
        product.price = price
        product.url = url

        await product.save()

        res.status(200).json(req.body)

    } catch(err) {
        throw new BadGateWayError()
    }
})


export { router as updateProductRouter }