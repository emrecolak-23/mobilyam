import express, {Request, Response } from 'express'

import requireAuth from '../../middlewares/require-auth'

const router = express.Router()

router.get('/api/auth/signout', requireAuth, (req: Request, res: Response) => {
    req.session = null
    res.cookie('session', '', {maxAge: 0})

    res.json(null)
})

export { router as signoutRouter }