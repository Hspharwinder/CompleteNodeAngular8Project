const jwt = require('jsonwebtoken');
require('dotenv/config');
require('express')

module.exports = (req,res,next)=>{
    try{
        let token = req.headers.authorization;
        if(token){
            token = token.split(" ")[1]; // remove bearer from token
        }
        const decoded = jwt.verify(token, process.env.Jwt_SecretKey);
        req.user = decoded;
        next();
    }
    catch(error){
        console.log("Invalid Token", error);
        return res.status(401).json({message : "Invalid Token" });
    }
}