const ProductCategory = require("../../models/product-category.model.js")
const systemConfig = require("../../config/system.js")

//1. [GET] Trang chính chủ
module.exports.index = async (req, res)=>{

    let find = {
        deleted: false
    }
    const records = await  ProductCategory.find(find)

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

//[POST] /admin/products-category/createPost
module.exports.createPost = async (req, res)=>{
    console.log(req.body)
    if(req.body.position == ""){
        const countProducts = await ProductCategory.countDocuments()
        req.body.position = countProducts + 1
    }else{
        req.body.position = parseInt(req.body.position)
    }
    
    //Tạo mới 1 sản phẩm với data lấy từ "req.body"
    const product = new ProductCategory(req.body)
    //Lưu sản phẩm vào database
    await product.save()
 
    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
 }
 