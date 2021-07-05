const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images')
    },
    filename: (req, file, cb) => {
        const ext = file.originalname,
        date = Date.now(),
        completed = date + '_' + ext;

      file.completed = completed

      cb(null, completed)
    }
})

const upload = multer({
    storage: storage,

    limits: {
        fileSize: 1 * 1920 * 1080,
        files: 1
    },

    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
        ) {
            cb(null, true)
        } else {
            cb(null, false)
            cb(new Error('le fichier doit etre au bon format'))
        }
    }
})

module.exports = upload