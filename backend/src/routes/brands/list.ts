import express, {Request, Response } from 'express'
import requireAuth from '../../middlewares/require-auth'
import isSuperAdmin from '../../guards/isSuperAdmin'

import { Brand } from '../../models/brands'

import { BadGateWayError } from '../../errors/bad-gateway-error'

const router = express.Router()


router.post('/api/brands/list', requireAuth, isSuperAdmin, async (req: Request, res: Response) => {
    const size = req.body.size || 1000;
    const queryPage = req.body.page || 1;
    const query = req.body.query || {};
    const searchParam = req.body.search || '';


    if (searchParam !== '') {
        query.$or = [
            { "name": { $regex: searchParam, $options: 'i' } },
            { "email": { $regex: searchParam, $options: 'i' } },
            { "webSite": { $regex: searchParam, $options: 'i' } },
            { "address": { $regex: searchParam, $options: 'i' } },
        ]; 
    }

    let pipeline = [
        { $match: query },
        { $sort: req.body.sort || { createdAt: -1 } },
    ];

    try {
        const count = await Brand.aggregate(pipeline)
        const brands = await Brand
        .aggregate(pipeline)
        .skip((queryPage - 1) * size)
        .limit(size)

        
        res.status(200).json({brands, count: count.length, page: queryPage || 1, size})

    } catch(err) {

        throw new BadGateWayError()
    
    }

})

export { router as listBrandsRouter }