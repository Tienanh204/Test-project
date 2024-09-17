
const mongoose = require("mongoose")
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema(
    { title: String,
    description:String,
    price:Number,
    discountPercentage:Number,
    stock:Number,
    thumbnail:String,
    status:String,
    position:Number,
    slug: {
        type: String,
        slug: "title", // Tạo slug từ trường "title"
        unique: true   // Đảm bảo slug là duy nhất
      },
    deleted:{type: Boolean, default: false},
    deletedAt: Date },

    { timestamps: true }
);

const Product = mongoose.model('Product', productSchema, "products")

module.exports = Product