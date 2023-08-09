import express, { Request, Response } from 'express'
import requireAuth from '../../middlewares/require-auth'
import isAdminOrSuperAdmin from '../../guards/isAdminOrSuperAdmin'
import validate from '../../middlewares/validate'
import { createProductValidation } from '../../validations/products'

import { Product } from '../../models/products'

import { BadGateWayError } from '../../errors/bad-gateway-error'

const router = express.Router()

router.post('/api/products/create', requireAuth, isAdminOrSuperAdmin, validate(createProductValidation), async (req: Request, res: Response) => {

    const productInfo = req.body

    try {
        const product = Product.build(productInfo)
        await product.save()

        res.status(200).json(req.body)

    } catch(err) {
        throw new BadGateWayError()
    }


})

export { router as productCreateRouter }