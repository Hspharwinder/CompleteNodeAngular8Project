var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const FormSchema = mongoose.model('FromData');
const multer = require('multer');
var ncp = require('ncp').ncp; // for coping file
require("dotenv/config"); // for base url of api
const authCheck = require('../AuthControllers/MiddleWare/AuthCheck');  // verify token before authorization

router.get('/get',authCheck, (req,res)=>{
   getData(req,res);   
});

function getData(req,res){
    FormSchema.find((err,doc)=>{
        if (!err) {
            return res.send(doc);
        }
        else {
            console.log('Error in retrieving Record list :' + err);
            return res.send(err);
        }
    });    
}

router.get('/get/:id',authCheck, (req,res)=>{
    FormSchema.findById(req.params.id, (err,doc)=>{
        if(!err)
            res.send(doc);
        else{            
            console.log('Error in retrieving book :' + err)
            res.send('Error in retrieving book :' + err)
        }
    });
});

router.put('/put',authCheck, (req,res)=>{
    FormSchema.findById(req.body.id, (err,doc)=>{
        if(err) return res.send("error form not valid "+ err);
        let response = update(req, doc);    
        res.send(response);        
    });
});

function update(req, doc){
    doc.dept = req.body.dept;
    doc.designation = req.body.designation;
    doc.email = req.body.email;
    doc.games = {...req.body.games};
    doc.otherGames = req.body.otherGames;
    doc.gender = req.body.gender;
    doc.hobbies = req.body.hobbies;
    doc.name = req.body.name;
    doc.password = req.body.password;
    doc.filePath = 'fileUpload/' + req.body.fileUpload.split('/')[1];

    fileCopy(req);   
    doc.save(function (err, doc) {
        let msg;
        if (!err) {
            console.log(doc.name + " form saved.");
            msg = doc.name + " form saved.";
        }
        else{
            console.error(err);
            msg = "err while updating.";
        }
        return msg;
    });
}

router.delete('/delete/:id',authCheck, (req,res)=>{
    FormSchema.findByIdAndRemove(req.params.id, (err,doc)=>{
        if (!err) {          
            console.log('Deletion Success :');
        }
        else {
            console.log('Error in while deleting record :' + err);
        }
    });   
    getData(req,res);
});

let filenameStore;
var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'Controllers/FormController/tempFile')
    },
    filename:function(req,file,cb){
        filenameStore = Date.now() + '_' + file.originalname;
        cb(null, filenameStore);
    }
  })

var upload = multer({ storage: storage });

let filePath;
router.post('/filePost', upload.single('File'), function (req, res, next) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
            fileUploadSucess: false,            
        });

    } else {
        console.log('file received'); 
        filePath = 'tempFile/'+ filenameStore;          
        return res.send({
            fileUploadSucess: true,
            filePath: filePath
        })
    }
});

function moveFile(){
    const fs = require('fs');
    const path = require('path');
    const directory = 'Controllers/FormController/tempFile';
    let msg;
    fs.readdir(directory, (err, files) => {
        if (err) throw err;
        for (const file of files) {
             fs.unlink(path.join(directory, file), err => {
                if (err) throw err;
                msg = 'successfully deleted ' + file;
                console.log('successfully deleted ' + file);
            });
        }
    });
}

function fileCopy(req){ 
    let msg;  
    if(filePath == req.body.fileUpload){       
        const fs = require('fs');
        let source = 'Controllers/FormController/tempFile/' + req.body.fileUpload.replace('tempFile/', '');
        let destination = 'Controllers/FormController/fileUpload/' + req.body.fileUpload.replace('tempFile/', '');
        // Copy dsingle file of folder
        fs.copyFile(source, destination, (err) => {
            if (err) throw err;
            console.log('source.txt was copied to destination.txt');
            moveFile(req);
        });


       
            // Copy all file of folder
          // ncp(source, destination, function (err) {
        //     if (err) {
        //         msg = "Error While copying file " + err;
        //         console.error(msg);            
        //     }
        //     else{         
        //         msg = "Copy File Done !!";
        //         console.log(msg); 
        //         moveFile(req,res);         
        //     }            
        // });
    }
}



router.post('/post', authCheck, (req,res)=>{
    let res1 = fileCopy(req,res);   
    let res2 = addRecords(req,res);    
    res.send({res:"Form saved sucess!!"});
    
});


function addRecords(req,res) {
    var form = new FormSchema(); 
    form.dept = req.body.dept,
    form.designation = req.body.designation,
    form.email = req.body.email,
    form.games = {...req.body.games},
    form.otherGames = req.body.otherGames,
    form.gender = req.body.gender,
    form.hobbies = {...req.body.hobbies},
    form.name = req.body.name
    form.password = req.body.password,
    form.filePath = 'Controllers/FormController/fileUpload/' + filenameStore;
    // req.body.fileUpload.replace(/^C:\\fakepath\\/i, '');
    
    let msg;
    form.save(function (err, form) {
        if (!err) {
            console.log(form.name + " form saved.");
            msg = " " + form.name + " form saved.";
        }
        else{
            console.error(err);
            msg = " err while saving.";
        }
    });    
    
}




module.exports = router;