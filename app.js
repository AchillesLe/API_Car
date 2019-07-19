const express = require('express');
const mongoose = require('mongoose');
const bodyPaser = require('body-parser')
// const multer = require('multer');
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//         let time = Date.now();
//         let file_name = file.originalname;
//         let extendtion = file_name.substr( - file_name.lastIndexOf('.') );
//         cb(null, file.fieldname + '-' + time + extendtion );
//     }
// })
// const upload = multer({  storage : storage  });
mongoose.connect("mongodb://dbapicar:password1@ds062818.mlab.com:62818/apicar",{ useNewUrlParser: true });
mongoose.Promise = global.Promise;
const logger = require('morgan');
const app = express();
const users_url = require('./routes/users');
const upload_url = require('./routes/upload');

//Midddewares
app.use(logger('dev'));
app.use(bodyPaser.json());

app.use('/users',users_url);
app.use('/uploads',upload_url);


// app.post('/uploads', upload.array('image',10), function (req, res, next) {
//     const files = req.files
//     console.log(files)
// })

app.get('/download', function (req, res, next) {
    const file = `uploads/image-1563524451932.jpeg`;
    res.download(file);
})
   
app.use( (req,res,next)=>{
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use( (err,req,res,next)=>{
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500;

    res.status(status).json({
        error : {
            message : error.message
        }
    })
});

const port = app.get('port') || 3000;
app.listen(port,()=>{
    console.log(`Server is listening on port on ${port}`);
})