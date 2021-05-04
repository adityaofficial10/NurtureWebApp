'use strict';
var mentorModel = require('../models/mentors');
var userModel = require('../models/Users');
var adminModel = require('../models/admins');
var eventModel = require('../models/events');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { sendEmailOnSignIn } = require('../helpers/mail');

module.exports = {

  login: function(req, res, next) {

    adminModel.findOne({
      email: req.body.email,
    }, function(err, adminInfo) {
      if (err) {
        next(err);
      } else {
        if (adminInfo) {
          if (bcrypt.compareSync(req.body.password, adminInfo.password)) {
            const token = jwt.sign({
              id: adminInfo._id,
            }, req.app.get('secretKey'), {
              expiresIn: '1h',
            });
            res.cookie('token', token, {
              maxAge: 1000 * 60 * 60, // 1 hour
            });
            sendEmailOnSignIn(adminInfo);
            res.json({
              code: 1,
              status: 'success',
              message: 'Admin found!!!',
              data: {
                admin: adminInfo,
                token: token,
              },
            });
          } else {
            res.json({
              code: 0,
              status: 'error',
              message: 'Invalid email or password',
              data: null,
            });
          }
        } else
          res.json({
            code: 0,
            status: 'error',
            message: 'There is no account associated with this email.',
            data: null,
          });
      }
    });
  },
  logout: function(req, res, next) {

    if (req.cookies.token){
      res.clearCookie('token');
      res.json({code: 1, status: 'success', message: 'Logged Out..',
        data: null});
    } else {
      res.json({code: 0, status: 'error', message: 'Log in first..',
        data: null});
    };
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
            available: mentor.available,
          });
        }
        if (mentorList.length)
          res.json({
            code: 1,
            status: 'success',
            message: 'Mentor List fetched..',
            data: mentorList,
          });
        else
          res.json({
            code: 0,
            status: 'success',
            message: 'There are currently no registered slots.',
            data: null,
          });
      }
    });
  },
  getScheduledEvents: function(req, res, next) {

    eventModel.findOne({
      mentor: req.body.mentorId,
    }, function(err, eventInfo) {
      if (err)
        next(err);
      else {
        if (eventInfo){
          userModel.findById(eventInfo.student).then(userInfo => {
            res.json({code: 1, status: 'Success',
              msg: 'Mentee Details Fetched..', data: userInfo});
          }).catch((err) => {
            console.error(err);
          });
        } else
          res.json({code: 0, status: 'Failure',
            msg: "You don't have a mentee yet.", data: null});
      }
    });
  },
};
