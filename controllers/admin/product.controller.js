const Product = require("../../models/product.model.js")
const filterStatusHelper = require("../../helpers/filterStatus.js")
const searchHelper = require("../../helpers/search.js")
const paginationHelper = require("../../helpers/pagination.js")
const systemConfig = require("../../config/system.js")

//1. [PATCH]
module.exports.index = async (req, res)=>{ 
    //1 Xử lý logic nút bấm
    let filterStatus = filterStatusHelper(req.query)

    let find = {
        deleted: false
    }
    if(req.query.status){
        find.status = req.query.status
    }

    //2. Tìm kiếm sản phẩm 
    let objectSearch = searchHelper(req.query)
    if(objectSearch.regex){
        find.title = objectSearch.regex
    }

    //3. Phân trang sản phẩm
    const countProducts = await Product.countDocuments(find)
    let objectPagination =  paginationHelper({
        limitItem: 4,
        currentPage: 1
    }, countProducts, req.query)

    
    //4. Render ra giao diện
    const products = await  Product.find(find)
                                   .sort({position: "desc"})
                                   .limit(objectPagination.limitItem)
                                   .skip(objectPagination.skip)

    res.render("admin/pages/products/index.pug", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    keyword: objectSearch.keyword,
    filterStatus: filterStatus,
    pagination: objectPagination
    })
}


//2. [PATCH] thay đổi trạng thái 1 sản phẩm
module.exports.changeStatus = async (req, res)=>{
    const status = req.params.status
    const id = req.params.id
    await Product.updateOne({_id: id}, {status: status})
    req.flash('success', 'Cập nhập thành công!');
    res.redirect("back")
}

//3. [PATCH] thay đổi trạnh thái (hoạt động/ ngường hoạt động/ xóa/ thay đổi vị trí) nhiều sản phẩm
module.exports.changeMulti = async (req, res) =>{
    let type = req.body.type
    let ids = (req.body.ids).split(",")

    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, {status: "active"})
            req.flash('success', 'Cập nhập thành công!');
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, {status: "inactive"})
            req.flash('success', 'Cập nhập thành công!');
            break;
        case "delete-all":
            await Product.updateMany(
                {_id: {$in: ids}},
                {
                    deleted: true,
                    deletedAt: new Date(),
                }
            )
            req.flash('success', 'Sản phẩm đã bị xóa!');
        case "change-position":
            for (const element of ids) {
                const [id, post] = element.split("-")
                await Product.updateOne({_id: id}, {position: post})
                req.flash('success', 'Sản phẩm đã được thay đổi!');
            }
        default:
            break;
    }
    res.redirect('back')
}

//4. [DELETE] xóa 1 sản phẩm
module.exports.deleteItem = async (req, res) =>{
    const id = req.params.id
    //Xóa mềm
    await Product.updateOne({_id: id}, {deleted: true})
    req.flash('success', 'Sản phẩm đã bị xóa!');
    res.redirect("back")
}


//5. Tạo mới 1 sanr phẩm
// [GET] "/admin/products/create"
module.exports.create = async (req, res) =>{
    res.render("admin/pages/products/create.pug")
}

// [POST] "/admin/products/create"
module.exports.createPost = async (req, res) =>{
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)

    if(req.body.position == ""){
        const countProducts = await Product.countDocuments()
        req.body.position = countProducts + 1
    }else{
        req.body.position = parseInt(req.body.position)
    }

    const newProduct = new Product(req.body)
    await newProduct.save()
    
    res.redirect(`${systemConfig.prefixAdmin}/products`)
}

