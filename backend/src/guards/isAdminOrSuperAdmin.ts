import { Request, Response, NextFunction } from "express";
import { User } from "../models/users";
import { NotAuthorizedError } from "../errors/not-authorized-error";

const isAdminOrSuperAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.currentUser!

    const user = await User.findById(id, { role: 1 })

    if(user && (user.role === 'superAdmin' || user.role === 'admin')) {
        return next()
    }

    throw new NotAuthorizedError('Not authorized')

}

export default isAdminOrSuperAdmin