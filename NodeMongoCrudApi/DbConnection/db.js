const mongoose = require('mongoose');
require("dotenv/config");
require('../Controllers/FormController/Model/form.model');
require('../Controllers/AuthControllers/Model/signup.model');

const uri = process.env.MONGOURL;
mongoose.connect(uri, { useNewUrlParser: true }, (err) => {
    console.log(uri);
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

