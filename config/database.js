const mongoose = require('mongoose')

module.exports.connect = ()=>{
    try {
        mongoose.connect(process.env.MONGO_URL)
        console.log("Connect success")
    } catch (error) {
        console.log("Connect fail, error:", error)
    }
}