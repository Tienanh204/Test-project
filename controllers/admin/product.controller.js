const Product = require("../../models/product.model.js")
const filterStatusHelper = require("../../helpers/filterStatus.js")
const searchHelper = require("../../helpers/search.js")
const paginationHelper = require("../../helpers/pagination.js")

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
    const products = await  Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip)
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
    res.redirect("back")
}

//3. [PATCH] thay đổi trạnh thái nhiều sản phẩm
module.exports.changeMulti = async (req, res) =>{
    let type = req.body.type
    let ids = (req.body.ids).split(",")

    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, {status: "active"})
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, {status: "inactive"})
            break;
        
        default:
            break;
    }
    res.redirect('back')
}

//4. [DELETE] xóa 1 sản phẩm
module.exports.deleteItem = async (req, res) =>{
    res.send("oke")
}
