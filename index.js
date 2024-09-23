const express = require('express');
const app = express();
var path = require('path');
require('dotenv').config();
const port = process.env.PORT;

// Khai báo các module cần thiết
const routeAdmin = require("./routes/admin/index.route.js");
const routeClient = require("./routes/client/index.route.js");
const database = require("./config/database.js");
const PATH_ADMIN = require("./config/system.js");

const bodyParser = require('body-parser');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');

// Kết nối đến MongoDB
database.connect();

// Cấu hình Pug
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

// Khai báo biến toàn cục có thể dùng ở nhiều nơi
app.locals.prefixAdmin = PATH_ADMIN.prefixAdmin;

// Middleware
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(express.static(`${__dirname}/public`)); // Static file
app.use(cookieParser('Tienanh@123'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

// Định nghĩa các route
routeClient(app);
routeAdmin(app);

//Trình soạn thảo htmnl
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// Lắng nghe trên cổng đã cấu hình
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
