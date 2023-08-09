import express, {Request, Response } from 'express'
import requireAuth from '../../middlewares/require-auth'
import isSuperAdmin from '../../guards/isSuperAdmin'

import { Brand } from '../../models/brands'

import { BadGateWayError } from '../../errors/bad-gateway-error'
import { NotFoundError } from '../../errors/not-found-error'

const router = express.Router()


router.get('/api/brands/show/:id', requireAuth, isSuperAdmin, async (req: Request, res: Response) => {

    const { id } = req.params

    try {

        const existingBrand = await Brand.findOne({_id: id})

        if (!existingBrand) {
            throw new NotFoundError()
        }

        res.status(200).json({brand: existingBrand})

    } catch(err) {
        throw new BadGateWayError()
    }

})

export { router as showBrandRouter }