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
 
//3. Chỉnh sửa 1 sản phẩm
//[GET] Aadmin/products-category/edit/:id
module.exports.edit = async (req, res)=>{
    const find = {
        _id: req.params.id,
        deleted: false
    }
    const product = await ProductCategory.findOne(find)

    res.render("admin/pages/product-category/edit.pug",{
        pageTitle: "Trang sửa sản phẩm",
        product: product
    })
}

module.exports.editPatch = async (req, res)=>{
    req.body.position = parseInt(req.body.position)

    try {
        await ProductCategory.updateOne({_id: req.params.id}, req.body )
        req.flash('success', 'Cập nhập thành công!');
        res.redirect(`${systemConfig.prefixAdmin}/products-category`)
    } catch (error) { 
        console.error('Error updating product:', error);
        req.flash('error', 'Cập nhật không thành công!');
        return res.redirect('back');
    }
}


//4. chi tiết 1 sản phẩm
//[GET] admin/products-category/detail/:id
module.exports.detail = async (req, res)=>{
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        };

    const product = await ProductCategory.findOne(find);
    
    res.render('admin/pages/product-category/detail', {
        pageTitle: product.title,
        product: product
    });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products-category`);
    }
}

//5. [DELETE] xóa 1 sản phẩm
module.exports.deleteItem = async (req, res) =>{
    const id = req.params.id
    //Xóa mềm
    await ProductCategory.updateOne({_id: id}, {deleted: true})
    req.flash('success', 'Sản phẩm đã bị xóa!');
    res.redirect("back")
}
