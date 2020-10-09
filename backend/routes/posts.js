const express = require('express')
const router = express.Router();
const checkAuth = require('../medllware/check-auth')

const postsController = require('../controllers/posts')
const multer = require('multer')

const MIME_TYPE_MAP = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype]
        let error = new Error('INVALID MIME TYPEE')
        if(isValid) {
            error = null;
        }
        cb(null, 'backend/images')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname.toLowerCase().split(' ').join('-') + "-" + Date.now() + '.' + MIME_TYPE_MAP[file.mimetype])
    }
})



router.post('', checkAuth, multer({storage: storage}).single('image'), postsController.postCreate)

router.get('', postsController.postsGet)

router.get('/:ids', postsController.postGet)

router.delete('/:id', checkAuth, postsController.postDelete)

router.put('/:id',checkAuth ,multer({storage: storage}).single('image'), postsController.postUpdate)

module.exports = router;
