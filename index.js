const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT

const routeAmin = require("./routes/admin/index.route.js")
const route = require("./routes/client/index.route.js")
const database = require("./config/database.js")
const PATH_ADMIN = require("./config/system.js")

var bodyParser = require('body-parser');

//
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Mongoose
database.connect()

//Router
route(app)
routeAmin(app)

//Static file
app.use(express.static('public'))

//Pug
app.set('views', './views')
app.set('view engine', 'pug')

//Khai báo biến toàn cục có thể dùng ở đất nhiều nơi
app.locals.prefixAdmin = PATH_ADMIN.prefixAdmin

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})