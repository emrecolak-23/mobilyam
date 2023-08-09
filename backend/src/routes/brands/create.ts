import express, { Request, Response } from 'express'
import requireAuth from '../../middlewares/require-auth'
import isSuperAdmin from '../../guards/isSuperAdmin' 
import validate from '../../middlewares/validate'
import { createBrandValidation } from '../../validations/brands'

import { Brand } from '../../models/brands'
import { User } from '../../models/users'

import Mailer from '../../services/Mailer'

import { generateAuthCode } from '../../utils/helper'
import { BadGateWayError } from '../../errors/bad-gateway-error'

const router = express.Router()


router.post('/api/brands/create', requireAuth, isSuperAdmin, validate(createBrandValidation), async (req: Request, res: Response) => {

    const brand = req.body

    try {
       
        const createdBrand = Brand.build(req.body)
        await createdBrand.save()

        const temporaryPassword = generateAuthCode()
        const user = User.build({email: brand.email, password: temporaryPassword, brandId: createdBrand._id })
        
        user.isActive = true
        await user.save()

        const mail = new Mailer('Mobilyam Temporary Password', brand.email, temporaryPassword)
        await mail.send()

        res.status(200).json(req.body)

    } catch(err) {

        throw new BadGateWayError()

    }


})


export { router as createBrandRouter }