const express = require('express')
const router = express.Router()

const multer  = require('multer')
const upload = multer()
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware.js")
const validate = require("../../validate/admin/product-category.validate.js")


const controller = require("../../controllers/admin/product-category.controller")

router.get('/', controller.index)

router.get('/create', controller.create)
router.post('/create',
    upload.single('thumbnail'),
    uploadCloud.upload,
    validate.createPost,
    controller.createPost)

module.exports = router;
