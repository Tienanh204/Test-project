const Product = require("../../models/product.model.js")
module.exports.index = async (req, res) => {

  const products = await Product.find({
     status: "active",
     deleted: false
  }).sort({position: "desc"})

  const newProducts = products.map(item=>{
    item.priceNew = (item.price - item.price * item.discountPercentage * 0.01).toFixed(0)//Thêm 1 thuộc tính priceNew cho mảng products
    return item;
  })

  res.render("client/pages/products/index.pug", {
    titlePage: "Danh sách sản phẩm",
    products: newProducts
   })
}