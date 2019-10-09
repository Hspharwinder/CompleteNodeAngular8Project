const mongoose = require('mongoose');

var FormSchema = new mongoose.Schema({
    name: String,
    dept: String,
    designation: String,
    email: String,
    games: [],
    otherGames:String,
    gender: String,
    hobbies: Object,
    password: String,
    filePath:String,
});

mongoose.model('FromData', FormSchema);