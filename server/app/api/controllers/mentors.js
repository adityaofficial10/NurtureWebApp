const mentorModel = require('../models/mentors');
const userModel = require('../models/Users');
const requestModel = require('../models/requests');
const eventModel = require('../models/events');
const slotModel = require('../models/slots');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const {
  sendMailOnRegister,
  sendEmailOnSignIn,
  sendEmailOnApproval
} = require('../helpers/mail');
const {
  mentorKey
} = require('../helpers/maps');
const {
  checkIfExistsMentor
} = require('../helpers/util');
module.exports = {

  create: function(req, res, next) {

    checkIfExistsMentor(req.body.email).then(
      (val) => {
        if (!val) {
          console.log(val);
          mentorModel.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            age: req.body.age,
            contactNumber: req.body.contactNumber
          }, function(err, result) {
            if (err)
              next(err);
            else {
              sendMailOnRegister(result);
              res.json({
                code: 1,
                status: "success",
                message: "Mentor added successfully!!!",
                data: result
              });
            }
          });
        } else
          res.json({
            code: 0,
            status: 'Failure',
            message: "There is already an account with this email.",
            data: null
          });
      },
      (err) => {
        console.error(err);
      }
    );
  },

  login: function(req, res, next) {
    console.log(req.body);
    mentorModel.findOne({
      email: req.body.email
    }, function(err, userInfo) {
      if (err) {
        next(err);
      } else {
        if (userInfo) {
          if (bcrypt.compareSync(req.body.password, userInfo.password)) {
            const token = jwt.sign({
              id: userInfo._id
            }, req.app.get('secretKey'), {
              expiresIn: '1h'
            });
            res.cookie('token', token, {
              maxAge: 1000 * 60 * 60, // 1 hour
            });
            sendEmailOnSignIn(userInfo);
            res.json({
              code: 1,
              status: "success",
              message: "Mentor found!!!",
              data: {
                user: userInfo,
                token: token
              }
            });
          } else {
            res.json({
              code: 0,
              status: "error",
              message: "Invalid email or password",
              data: null
            });
          }
        } else
          res.json({
            code: 0,
            status: "error",
            message: "There is no account associated with this email.",
            data: null
          })
      }
    });
  },
  logout: function(req, res, next) {

     if(req.cookies.token){
       res.clearCookie('token');
       res.json({code:1,status:'success',message:'Logged Out..',data:null});
     }
     else{
       res.json({code:0,status:'error',message:'Log in first..',data:null});
     }
    },

  getById: function(req, res, next) {
    console.log(req.body);
    mentorModel.findById(req.body.mentorId, function(err, mentorInfo) {
      if (err)
        next(err);
      else {
        console.log(mentorInfo);
        res.json({
          code: 1,
          status: "success",
          message: "Mentor found!!!",
          data: mentorInfo
        });
      }
    });
  },
  getRequests: function(req, res, next) {
    console.log(req.body);
    requestModel.find({
      mentor: req.body.mentorId
    }, function(err, requests) {
      if (err)
        next(err);
      else
        res.json({
          status: "success",
          message: "Requests for the given mentor found.",
          data: requests
        });

    });
  },
  getMentors: function(req, res, next) {
    let mentorList = [];
    mentorModel.find({}, function(err, mentors) {
      if (err)
        next(err);
      else {
        for (let mentor of mentors) {
          mentorList.push({
            name: mentor.name,
            email: mentor.email,
            contactNumber: mentor.contactNumber,
            available: mentor.available
          });
        }
        if (mentorList.length)
          res.json({
            code: 1,
            status: "success",
            message: "Mentor List fetched..",
            data: mentorList
          });
        else
          res.json({
            code: 0,
            status: 'success',
            message: "There are currently no registered slots.",
            data: null
          });
      }
    });
  },
  getScheduledEvents: function(req, res, next) {

    eventModel.findOne({
      mentor: req.body.mentorId
    }, function(err, eventInfo) {
      if (err)
        next(err);
      else{
        if(eventInfo){
          userModel.findById(eventInfo.student).then(userInfo =>{
            res.json({code:1,status:'Success',msg:'Mentee Details Fetched..',data:userInfo});
          }).catch((err)=>{
            console.error(err);
          });
        }
        else
         res.json({code:0,status:'Failure',msg:"You don't have a mentee yet.",data:null});
      }
    });
  },
  getSlotsForMentor: function(req, res, next) {

    slotModel.find({
      mentor: req.body.mentorId
    }, function(err, slots) {
      if (err)
        next(err);
      else
        res.json({
          status: 'success',
          message: 'Slots fetched..',
          data: slots
        });
    });
  },
};
