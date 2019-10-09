const mongoose = require('mongoose');

var Signup = new mongoose.Schema({
    //id: new mongoose.Types.ObjectId(),
    username: { type: String, unique: true, required: true },
    password: { type: String, unique: true, required: true },
    firstName: String,
    lastName: String,
    token: String,
    role:String,
});
mongoose.model('SignupColl', Signup);

