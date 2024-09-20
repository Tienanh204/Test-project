const express = require('express')
const router = express.Router()

const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
//const storageMulter = require("../../helpers/storageMulter.js")
const multer  = require('multer')
const upload = multer()

cloudinary.config({ 
    cloud_name: 'dpfnbbiq4', 
    api_key: '821816283773499', 
    api_secret: 'ibzKHBXf78NFOnYdOV1Q6325c-Q' // Click 'View API Keys' above to copy your API secret
});

const validate = require("../../validate/admin/product.validate.js")

const controller = require("../../controllers/admin/product.controller.js")

router.get('/', controller.index)

router.patch('/change-status/:status/:id', controller.changeStatus)

router.patch('/change-multi', controller.changeMulti)

router.delete('/delete/:id', controller.deleteItem) 

//Tạo mới sản phẩm
router.get('/create', controller.create) 

router.post('/create', 
    upload.single('thumbnail'),
    async function (req, res, next) {
        if (req.file) {
            let streamUpload = (req) => {
                return new Promise((resolve, reject) => {
                    let stream = cloudinary.uploader.upload_stream(
                      (error, result) => {
                        if (result) {
                          resolve(result);
                        } else {
                          reject(error);
                        }
                      }
                    );
                  streamifier.createReadStream(req.file.buffer).pipe(stream);
                });
            };

            try {
                let result = await streamUpload(req);
                req.body[req.file.fieldname] = result.url;
                next();  // Chuyển sang middleware tiếp theo
            } catch (error) {
                console.error('Lỗi upload:', error);
                res.status(500).send({ error: 'Upload failed.' }); // Trả về lỗi nếu upload thất bại
            }
        } else {
            next();  // Nếu không có file, chuyển sang middleware tiếp theo
        }
    }, 
    validate.createPost,
    controller.createPost
);


//Chỉnh sửa sản phẩm
router.get('/edit/:id', controller.edit) 

router.patch('/edit/:id', 
    upload.single('thumbnail'),
    validate.createPost,
    controller.editPatch) 

//Chi tiết sản phẩm
router.get('/detail/:id', controller.detail)

module.exports = router