import express, { Request, Response } from 'express'
import requireAuth from '../../middlewares/require-auth'
import isAdminOrSuperAdmin from '../../guards/isAdminOrSuperAdmin'
import validate from '../../middlewares/validate'
import { updateProductAdminValidation } from '../../validations/products'

import { Product } from '../../models/products'

import { BadGateWayError } from '../../errors/bad-gateway-error'
import { NotFoundError } from '../../errors/not-found-error'

const router = express.Router()


router.post('/api/products/update/:id', requireAuth, isAdminOrSuperAdmin, validate(updateProductAdminValidation), async (req: Request, res: Response) => {

    const { id } = req.params

    try {

        const product = await Product.findOne({_id: id})

        if(!product) {
            throw new NotFoundError()
        }

        await Product.updateOne({_id: id}, {
            $set: {
                ...req.body
            }
        })


        res.status(200).json(req.body)

    } catch(err) {
        throw new BadGateWayError()
    }


})

export { router as updateProductAdminRouter }