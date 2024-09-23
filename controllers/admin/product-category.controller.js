const Product = require("../../models/product-category.model.js")
const systemConfig = require("../../config/system.js")

//1. [GET] Trang chính chủ
module.exports.index = async (req, res)=>{

    let find = {
        deleted: false
    }
    const records = await  Product.find(find)

    res.render("admin/pages/product-category/index.pug", {
        pageTitle: "Danh mục sản phẩm",
        records: records
    })
}

//2. Tạo danh mục sản phẩm
//[GET] /admin/products-category/create
module.exports.create = async (req, res)=>{
    res.render("admin/pages/product-category/create.pug", {
        pageTitle: "Danh mục sản phẩm"
    })
}