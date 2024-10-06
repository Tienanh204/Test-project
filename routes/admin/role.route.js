const express = require('express')
const router = express.Router()

const controller = require("../../controllers/admin/role.controller")

router.get('/', controller.index)

//Tạo
router.get('/create', controller.create)
router.post('/create', controller.createPost)

//Chi tiết
router.get('/detail/:id', controller.detail)

//Sửa
router.get('/edit/:id', controller.edit)
router.patch('/edit/:id', controller.editPatch)

//Xóa
router.delete('/delete/:id', controller.deleteRole)

//Phân quyền
router.get('/permissions', controller.permissions)
router.patch('/permissions', controller.permissionsPatch)
module.exports = router
