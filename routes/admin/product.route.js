const express = require('express')
const router = express.Router()

const storageMulter = require("../../helpers/storageMulter.js")
const multer  = require('multer')
const upload = multer({ storage: storageMulter()})

const controller = require("../../controllers/admin/product.controller.js")

router.get('/', controller.index)

router.patch('/change-status/:status/:id', controller.changeStatus)

router.patch('/change-multi', controller.changeMulti)

router.delete('/delete/:id', controller.deleteItem) 

//Tạo mới sản phẩm
router.get('/create', controller.create) 

router.post('/create', upload.single('thumbnail'), controller.createPost) 

//Chỉnh sửa sản phẩm
router.get('/edit/:id', controller.edit) 

router.patch('/edit/:id', 
    upload.single('thumbnail'),
    controller.editPatch) 


module.exports = router