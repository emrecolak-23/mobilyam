import express, { Request, Response } from 'express'
import requireAuth from '../../middlewares/require-auth'
import isBrandOrSuperAdmin from '../../guards/isBrandOrSuperAdmin'
import validate from '../../middlewares/validate'
import { createBrandValidation } from '../../validations/brands'

import { Brand } from '../../models/brands'

import { NotFoundError } from '../../errors/not-found-error'
import { BadGateWayError } from '../../errors/bad-gateway-error'

const router = express.Router()

router.patch('/api/brands/update/:id', requireAuth, isBrandOrSuperAdmin, validate(createBrandValidation), async (req: Request, res: Response) => {

    const { id } = req.params
    const brandInfo = req.body

    try {

        const existingBrand = await Brand.findById(id)

        if(!existingBrand) {
            throw new NotFoundError()
        }

        const updatedBrand = await Brand.findByIdAndUpdate(id, brandInfo, {new: true})

        res.status(200).json(req.body)

    } catch(err) {
        throw new BadGateWayError()
    }

})


export { router as updateBrandRouter }