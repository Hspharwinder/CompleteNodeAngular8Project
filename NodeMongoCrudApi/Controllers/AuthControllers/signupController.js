var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const signupDB = mongoose.model('SignupColl');
// const service = require('./Service/jwtService');
const bcrypt = require('bcrypt');
require('dotenv/config');
const jwt = require('jsonwebtoken');


router.post('/signup', signup);
router.post('/login', login);



function signup(req,res) {    
    debugger;
    signupDB.findOne({username:req.body.username}).exec().then(user => {
        if (user !== null && user.length >= 1  ) {
            return res.status(409).json({ message: "User Already Exists"});
         } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({ error: "Error While Password Crypting " + err });
                } else {
                    var dataColl = new signupDB();
                    dataColl.username = req.body.username; 
                    dataColl.password = hash; 
                    dataColl.firstName = req.body.firstName; 
                    dataColl.lastName = req.body.lastName;
                    dataColl.role =  req.body.role; 
                    dataColl.save().then(result => {
                        console.log(result);
                        res.status(201).json({message: "Record inserted Successfully"});
                    }).catch(err=>{
                        console.log("Error While Insertion ", err);
                        res.status(500).json({error: "Error While Insertion " + err }); 
                    });
                }
            });
        }
    });
}

function login(req,res){
    signupDB.findOne({username:req.body.username})
    .then(user=>{
        if(user === null || user.length < 1){
            return res.status(401).json({message: "Invalid UserName"});
        }
        bcrypt.compare(req.body.password, user.password, (err,result)=>{
            if(err){
                return res.status(401).json({message:"Invalid Password"})
            }
            if(result){
                const tokenStore = jwt.sign(
                                {id:user._id,  password:user.password},
                                process.env.Jwt_SecretKey,  //also can pass in json like -- {secretKey:process.env.Jwt_SecretKey}
                                {expiresIn : "1h"}
                            );
                            return res.status(200).json({message:"Login Success", token : tokenStore});
            }
            return res.status(401).json({message:"Invalid Password"});
        })
    }).catch(err=>{
        console.log("Error while Finding user ", err);
       res.status(500).json({error : "Error while Finding user, May be user already exists "+ err})
    })
    // service.authenticate(req.body).then((user) => { 
    //     debugger;
    //     if(user == "Invalid User!"){
    //        res.status(400).json({ message: 'Username or password is incorrect' })
    //     }else{
    //         res.status(200).json({ message: user })
    //     }
    // })
    // .catch(err => next(err));
}


module.exports=router;