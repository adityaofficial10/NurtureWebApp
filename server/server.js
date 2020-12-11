require('dotenv').config({
  path:'config/.env'
});

const express = require('express');
const cors = require("cors");
const  _ = require('lodash');
const fileUpload = require('express-fileupload');
const multer = require('multer');
const aws = require('aws-sdk');
const logger = require('morgan');
const requestsForMentors = require('./routes/requestForMentors');
const users = require('./routes/Users');
const mentors = require('./routes/mentors');
const events = require('./routes/events');
const requests = require('./routes/requests');
const slots = require('./routes/slots');
const userModel = require('./app/api/models/Users');
const mentorModel = require('./app/api/models/mentors');
const bodyParser = require('body-parser');
const mongoose = require('./config/database'); //database configuration
var jwt = require('jsonwebtoken');
const app = express();
app.set('secretKey', 'nodeRestApi'); // jwt secret token

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(logger('dev'));
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', function(req, res){
res.json({"description" : "This is a web app developed for Nurture..."});
});
// public route
app.get("/hello",function(req,res){
  res.send("Hello World!");
});
app.use('/users', users);
app.use('/mentors',mentors);
// private route
app.use('/events',validateUser,events);
app.use('/requests',validateUser,requests);
app.use('/request',validateMentor,requestsForMentors);
app.use('/slots',validateMentor,slots);
app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});
function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({status:"error", message: err.message, data:null});
    }else{
      // add user id to request
      req.body.userId = decoded.id;
      userModel.findById(decoded.id,function(err,userInfo){
      if(err)
       next(err);
      else{
       req.body.userName = userInfo.name;
       req.body.userEmail = userInfo.email;
       next();
      }
      });
      
    }
  });
}
function validateMentor(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({status:"error", message: err.message, data:null});
    }else{
      // add user id to request
      req.body.mentorId = decoded.id;
      mentorModel.findById(decoded.id,function(err,mentorInfo){
        if(err)
         next(err);
        else
        {
          req.body.mentorName = mentorInfo.name;
          req.body.mentorEmail = mentorInfo.email;
          next();
        }
        });    
    }
  });
}
// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function(req, res, next) {
 let err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// handle errors
app.use(function(err, req, res, next) {
 console.log(err);
 
  if(err.status === 404)
   res.status(404).json({message: "Not found"});
  else 
    res.status(500).json({message: "Something looks wrong :( !!!"});
});

var port = process.env.PORT;
app.listen(port, function(){
 console.log(`Server running on port ${port}...`);
});

