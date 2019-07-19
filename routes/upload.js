const express = require('express');
const router = express.Router();
const multer = require('multer');
const UploadController = require('../controllers/upload');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        let time = Date.now();
        let file_name = file.originalname;
        let extendtion = file_name.substr( - ( file_name.lastIndexOf('.') ) );
        cb(null, file.fieldname + '-' + time + extendtion );
    }
})
const upload = multer({  storage : storage  });

router.route('/')
.post( upload.array('image',10) , UploadController.array )

module.exports = router;