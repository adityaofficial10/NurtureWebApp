'use strict';
require('dotenv').config({
  path: 'config/.env',
});

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');
const requestsForMentors = require('./routes/requestForMentors');
const requestsForUsers = require('./routes/requestForUsers');
const users = require('./routes/Users');
const mentors = require('./routes/mentors');
const admins = require('./routes/admins');
const events = require('./routes/events');
const slots = require('./routes/slots');
const profiles = require('./routes/profiles');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { createMongoConnection, imageModel } = require('./config/database');
// database configuration
var jwt = require('jsonwebtoken');

const app = express();
app.set('secretKey', 'nodeRestApi'); // jwt secret token

const path = require('path');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const { mongoURI } = require('./config/database');

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err)
          return reject(err);
        const fileName = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          fileName: fileName,
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });
// eslint-disable-next-line no-unused-vars
let gfs;
// connection to mongodb


var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.use(logger('dev'));
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', function(req, res){
  res.json({description: 'This is a web app developed for Nurture...'});
});
// public route
app.use('/users', users);
app.use('/mentors', mentors);
app.use('/admins', admins);
app.use('/profiles', profiles);
// private route
app.use('/events', validateUser, events);
app.use('/request', validateMentor, requestsForMentors);
app.use('/userDashboard', validateUser, requestsForUsers);
app.use('/slots', validateMentor, slots);
app.get('/favicon.ico', function(req, res) {
  res.sendStatus(204);
});


// Route for uploading a single file
app.post('/upload/single', upload.single('file'), (req, res, next) => {
  console.log("Hello");
  console.log(req.file);
  // eslint-disable-next-line new-cap
  imageModel.create({
    filename: req.body.filename,
    fileId: req.file.id,
  }, function(err, image) {
    if (err)
      res.json({status: 500, message: err});
    else
      res.json({status: 200,
        message: 'File uploaded successfully', data: image});
  });
});

// Route for uploading multiple files
app.post('/upload/multiple', upload.array('file', 5), (req, res, next) => {
  console.log(req.file);
  res.json({code: 1, status: 200, message: 'Files uploaded successfully...'});
});

function validateUser(req, res, next) {

  jwt.verify(req.cookies.token, req.app.get('secretKey'),
    function(err, decoded) {
      if (err) {
        res.json({code: -1, status: 'error', message: err.message, data: null});
      } else {
      // add user id to request
        req.body.userId = decoded.id;
        // eslint-disable-next-line no-undef
        userModel.findById(decoded.id, function(err, userInfo){
          if (err)
            next(err);
          else {
            req.body.userName = userInfo.name;
            req.body.userEmail = userInfo.email;
            next();
          }
        });

      }
    });
}
function validateMentor(req, res, next) {
  console.log(req.cookies);
  jwt.verify(req.cookies.token, req.app.get('secretKey'),
    function(err, decoded) {
      if (err) {
        res.json({code: -1, status: 'error', message: err.message, data: null});
      } else {
      // add user id to request
        req.body.mentorId = decoded.id;
        // eslint-disable-next-line no-undef
        mentorModel.findById(decoded.id, function(err, mentorInfo){
          if (err)
            next(err);
          else {
            req.body.mentorName = mentorInfo.name;
            req.body.mentorEmail = mentorInfo.email;
            next();
          }
        });
      }
    });
}
// express doesn't consider not found 404 as an error so
// we need to handle 404 explicitly
// handle 404 error
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// handle errors
app.use(function(err, req, res, next) {
  console.log(err);

  if (err.status === 404)
    res.status(404).json({message: 'Not found'});
  else
    res.status(500).json({message: 'Something looks wrong :( !!!'});
});

console.log('=> Connecting to MongoDB Atlas...');
createMongoConnection(mongoURI).then((connection) => {
  global.userModel
  = connection.model('User', require('./app/api/models/Users'));
  global.mentorModel
  = connection.model('Mentor', require('./app/api/models/mentors'));
  global.adminModel
  = connection.model('Admin', require('./app/api/models/admins'));
  global.eventModel
  = connection.model('Event', require('./app/api/models/events'));
  global.slotModel
  = connection.model('Slot', require('./app/api/models/slots'));
  global.sessionModel
  = connection.model('Session', require('./app/api/models/sessions'));
  global.imageModel
  = connection.model('Image', require('./app/api/models/images'));
  console.log('=> MongoDB Database connected...');
  connection.on('error',
    console.error.bind(console, 'MongoDB connection error:'));

  // eslint-disable-next-line no-unused-vars
  connection.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(connection.db, {
      bucketName: 'uploads',
    });
  });

  var port = process.env.PORT;
  app.listen(port, function(){
    console.log(`=> Server running on port ${port}...`);
  });
}).catch((err) => {
  console.log(err);
});

