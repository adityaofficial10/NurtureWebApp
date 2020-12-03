const express = require('express');
const cors = require('cors');
const multer = require("multer");
const fileupload = require("express-fileupload");
const path = require("path");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const _ = require('lodash');
const aws = require("aws-sdk");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(morgan('dev'));


const { Mentor, User, Event, Request, Slot } = require("./datastore.js");

app.get("/mentors",function(req,res){

  Mentor.find({},'name email available contactNumber').then((d)=>{
    res.send(d);
  }).catch((error)=>{
    console.error(error);
  });

});

app.post("/request",function(req,res){

   var d1 = req.body.startTime;
   var d2 = req.body.endTime;
   const mtr = Mentor.find({name:req.body.mentorName}).then((data)=>{

     const r = new Request({
       title: req.body.title,
       description: req.body.description,
       mentor:data._fields._id,
       student:,
       date:req.body.date,
       startTime:d1,
       endTime:d2,
       duration:d2-d1
     });
     r.save().then((succ)=>{
       console.log("Success");
     }).catch((error)=>{
       console.error(error);
     });

   });

});


app.listen(3000,function(err){
  if(err)
  console.error(err);
  else
  console.log("Server running on port 3000...");
});
