// Import Dependencies
import express, {Request, Response, NextFunction } from 'express'
import toobusy from 'toobusy-js'
import 'express-async-errors'
import cors from 'cors'
import cookieSession from 'cookie-session'
// import cookieSession from 'cookie-session'
import * as dotenv from 'dotenv'
dotenv.config()

// Import Middlewares
import { currentUser } from './middlewares/current-user'
import { errorHandler } from './middlewares/error-handler'

// Import Errors
import { NotFoundError } from './errors/not-found-error'
import { ServerTooBusyError } from './errors/server-too-busy-error'


// Import Auth Routes
import {
    currentuserRouter,
    signinRouter,
    signoutRouter,
    signupRouter,
    verifyTokenRouter,
    resetPasswordRequestRouter,
    resetPasswordRouter,
    changePasswordRouter
} from './routes/auth'


// Import Brands Routes
import {
    createBrandRouter,
    updateBrandRouter,
    showBrandRouter,
    listBrandsRouter,
    showBrandUserRouter
} from './routes/brands'

// Import Files Routes
import {
    uploadFileRouter
} from './routes/files'

// Import Products Routes
import {
    productCreateRouter,
    showProductRouter,
    listProductRouter,
    updateProductRouter,
    updateProductAdminRouter
} from './routes/products'

const app = express()


// Middlewares
app.use((req: Request, res: Response, next: NextFunction) => {
    if(toobusy()) {
        throw new ServerTooBusyError('Server to busy')
    }
    next()
})
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:5173']
}))
app.set('trust proxy', true)
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV === 'production'
}))

app.use(currentUser)

// Auth Routes Middlewares
app.use(currentuserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)
app.use(verifyTokenRouter)
app.use(resetPasswordRequestRouter)
app.use(resetPasswordRouter)
app.use(changePasswordRouter)


// Brand Routes Middlewares
app.use(createBrandRouter)
app.use(updateBrandRouter)
app.use(showBrandRouter)
app.use(listBrandsRouter)
app.use(showBrandUserRouter)

// Product Routes Middlewares
app.use(productCreateRouter)
app.use(showProductRouter)
app.use(listProductRouter)
app.use(updateProductRouter)
app.use(updateProductAdminRouter)

// Files Routes Middlewares
app.use(uploadFileRouter)

app.all('*', (req, res, next) => {
    console.log('Not found')
    next(new NotFoundError())
})

app.use(errorHandler)

export { app }