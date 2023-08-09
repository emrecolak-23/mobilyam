import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from '../errors/not-authorized-error'
import { User } from "../models/users";
const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
   
    if(!req.currentUser) throw new NotAuthorizedError()
    
    const {id} = req.currentUser
    const user = await User.findById(id)
    if(!user) throw new NotAuthorizedError()

    next()
}

export default requireAuth