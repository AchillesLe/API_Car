const express = require('express');

const logger = require('morgan');
const app = express();
const users_url = require('./routes/users');

//Midddewares
app.use(logger('dev'))
app.use('/users',users_url);

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