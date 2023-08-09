import express, { Request, Response } from 'express'


const router = express.Router()


router.get('/api/auth/currentuser', (req: Request, res: Response) => {
    res.send(req.currentUser || null)
})


export { router as currentuserRouter }