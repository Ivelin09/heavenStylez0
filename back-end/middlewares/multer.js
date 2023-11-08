const multer = require('multer');
const fs = require("fs")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(req.body.path)
        if (!fs.existsSync(`./products/${req.body.path}`))
            fs.mkdirSync(`./products/${req.body.path}`);

        cb(null, `./products/${req.body.path}`);
    },
    filename: function (req, file, cb) {
        console.log(req.body, "here");
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + ".png")
    }
})

const upload = multer({ storage: storage });
module.exports = upload;