const Roles = require("../../models/role.model")

const systemConfig = require("../../config/system.js")
const createTreeHelper = require("../../helpers/createTree.js")


//1. [GET] admin/roles
module.exports.index = async (req, res)=>{
    const find = {
        deleted: false
    }
    const records = await Roles.find(find)
    res.render("admin/pages/roles/index.pug", {
        pageTitle: "Nhóm quyền",
        records: records
    })
}

//2
//[GET] admin/roles/create
module.exports.create = async (req, res)=>{
    const find = {
        deleted: false
    }
    const records = await Roles.find(find)
    res.render("admin/pages/roles/create.pug", {
        pageTitle: "Tạo mhóm quyền",
        records: records
    })
}

//[POST] admin/roles/ceate
module.exports.createPost = async (req, res)=>{
    const role = new Role(req.body)
    await role.save()
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}


//3 Chi tiết nhóm quyền
module.exports.detail = async (req, res)=>{
    const find = {
        deleted: false,
        _id: req.params.id
    }
    const records = await Roles.findOne(find)
    res.render("admin/pages/roles/detail.pug", {
        pageTitle: "Chi tiết mhóm quyền",
        records: records
    })
}

//4. Sửa nhóm quyền
//[GET] admin/roles/edit
module.exports.edit = async (req, res)=>{
    const find = {
        _id: req.params.id,
        deleted: false
    }
    const records = await Roles.findOne(find)
    res.render("admin/pages/roles/edit.pug", {
        pageTitle: "Sửa nhóm quyền",
        records: records
    })
}

//[PATCH] admin/roles/editPatch
module.exports.editPatch = async (req, res)=>{
    try {
        await Roles.updateOne({_id: req.params.id}, req.body);
        req.flash('success', 'Cập nhập thành công');
    } catch (error){
        req.flash('error', 'Lỗi cập nhập!');
    }
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}


//[DELETE] admin/roles/delete/:id

module.exports.deleteRole = async (req, res)=>{
    const id = req.params.id
    await Roles.updateOne({_id: id}, {
        deleted: true
    })
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}
