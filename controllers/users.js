const User = require('../models/user')
module.exports = {
    index : (req,res,err)=>{
        console.log("start");
        User.find({})
        .then(users=>{
            res.status(200).json({users});
            console.log("end 2");
        })
        .catch(err=>{
            next(err)
        })
        console.log("end");
    },
    // index : async (req,res,next)=>{
    //     console.log("start");
    //     try{
    //         const users = await User.find({});
    //         res.status(200).json({users});
    //         console.log("end");
    //     }
    //     catch(err){
    //         next(err);
    //     }
    // },
    newUser : (req,res,next)=>{
        User.create(req.body)
        .then( (user=>{
            res.status(200).json({user});
        }))
        .catch( (err)=>{
            next(err)
        })
    },
};