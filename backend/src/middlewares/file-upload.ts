import multer from "multer";
import path from 'path'


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'uploads', 'files'))
    },
    filename: function(req, file, cb) {
        console.log(file)
        cb(null, req.currentUser!.id + '_' + file.originalname)
    }
})


const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: function (req, file, cb) {
        console.log(file)
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf', 'model/gltf-binary']
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.pdf', '.glb']

        if(allowedMimeTypes.includes(file.mimetype)) {
            const fileExt = path.extname(file.originalname).toLocaleLowerCase()
            if(allowedExtensions.includes(fileExt)) {
                cb(null, true)
            } else {
                cb(new Error('Invalid file extensions'))
            }
        } else {
            cb(new Error('Invalid file type'))
        }
    }
})


export { upload }