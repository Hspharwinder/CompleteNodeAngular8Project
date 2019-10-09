const mongoose = require('mongoose');
const db = mongoose.model('SignupColl');
const config = require('../config.json');
const jwt = require('jsonwebtoken');

module.exports = {
    authenticate,
};

async function authenticate({username,password}){
    debugger;
    var user =  await db.findOne({ username: username, password:password }
    //     , function(err, user) {
    //     if (err) { return err; }
    //     if (user) {
    //         const user1 = {id:45};
    //         const token = jwt.sign({user1},config.secretKey);
    //         console.log(token);
    //         return token;              
    //     }else{
    //         return  "Invalid User!";
    //     }        
    // }
    ).then(sucess,failure).catch(err => next(err));
    function sucess(){
        const user = {id:45};
        const token = jwt.sign({user},config.secretKey);
        return token;
    }
    function failure(){
        return "Invalid User Password";
    }
    return user;

    // var user = db.findOne({username})
    // if(user){
    //     const user1 = {id:45};
    //     const token = jwt.sign({user1},config.secretKey);
    //     console.log(token)
    //     return token;
    // }
    // else{
    //     return "Invalid User Password";
    // }

    // var user = await db.findOne({ username: username, password:password }, function(err, user) {
    //     if (err) { return err; }
    //     if (user) {
    //         const user1 = {id:45};
    //         const token = jwt.sign({user1},config.secretKey);
    //         console.log(token);
    //         return token;              
    //     }else{
    //         return  "Invalid User!";
    //     }
    //     // user.checkPassword(password, function(err, isMatch) {
    //     //     if (err) { return err }
    //     //         if (isMatch) {
                  
    //     //         } else {
    //     //             return "Invalid password.";
    //     //     }
    //     // });
    // });
    // return user;

}