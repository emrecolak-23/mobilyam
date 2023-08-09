import express, { Request, Response } from 'express'
import mongoose from 'mongoose';
import requireAuth from '../../middlewares/require-auth'


import { User } from '../../models/users';
import { Product } from '../../models/products';

import { BadGateWayError } from '../../errors/bad-gateway-error';

const router = express.Router()

router.post('/api/products/list', requireAuth, async (req: Request, res: Response) => {

    const size = req.body.size || 1000;
    const queryPage = req.body.page || 1;
    const query = req.body.query || {};
    const searchParam = req.body.search || '';
    const id = req.body.id

    try {

        if (searchParam !== '') {
            query.$or = [
                { "name": { $regex: searchParam, $options: 'i' } },
                { "description": { $regex: searchParam, $options: 'i' } },
                { "url": { $regex: searchParam, $options: 'i' } },
            ]; 
        }
    
        const user = await User.findOne({_id: req.currentUser?.id})
    
        if(user?.role === 'brand') {
            query.brandId = new mongoose.Types.ObjectId(user.brandId)
        } else if (user?.role === 'admin' || user?.role === 'superAdmin') {
            query.brandId = new mongoose.Types.ObjectId(id)
        }
            
        let pipeline = [
            { $match: query },
            { $sort: req.body.sort || { createdAt: -1 } },
        ];
    
        const count = await Product.aggregate(pipeline)
        const products = await Product
        .aggregate(pipeline)
        .skip((queryPage - 1) * size)
        .limit(size)
    
        res.status(200).json({products, count: count.length, page: queryPage || 1, size})

    } catch(err) {
        console.log(err)
        throw new BadGateWayError()
    }



})


export { router as listProductRouter }