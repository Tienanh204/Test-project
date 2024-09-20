const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_KEY, 
    api_secret: process.env.CLOUD_SECRET 
});

module.exports.upload = (req, res, next) => {
    if (req.file) {
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };

        // Bọc trong try...catch để xử lý lỗi
        async function upload(req) {
            try {
                let result = await streamUpload(req);
                // console.log(result.url);
                //console.log("ở đây ảnh:",req.file)
                req.body[req.file.fieldname] = result.url;  // Lưu URL vào body
                next();  // Chuyển sang middleware tiếp theo
            } catch (error) {
                console.error('Lỗi trong quá trình upload:', error);
                res.status(500).send({ error: 'Upload failed.' });  // Trả về lỗi nếu có lỗi xảy ra
            }
        }

        upload(req);

    } else {
        next();  // Nếu không có file, tiếp tục middleware tiếp theo
    }
};
