import express, {Request, Response} from 'express'
import { upload } from '../../middlewares/file-upload'

import requireAuth from '../../middlewares/require-auth'
import { BadRequestError } from '../../errors/bad-request.error'


const router = express.Router()


router.post('/api/files/file-upload', requireAuth,  upload.single('file'), (req: Request, res: Response) => {

   if(!req.file) {
        throw new BadRequestError('No file uploaded')
   }


   const uploadedFileName = req.currentUser!.id + '_' + req.file.originalname

   res.json({file: uploadedFileName})

})

export { router as uploadFileRouter }