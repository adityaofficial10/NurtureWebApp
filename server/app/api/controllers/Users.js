'use strict';
const userModel = require('../models/Users');
const eventModel = require('../models/events');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendMailOnRegister, sendEmailOnSignIn } = require('../helpers/mail');
const { printUsers } = require('../helpers/maps');
const { checkIfUserExists } = require('../helpers/util');

module.exports = {

  create: function(req, res, next) {

    checkIfUserExists(req.body.email).then(
      (val) => {
        if (!val){
          console.log(val);
          userModel.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            age: req.body.age,
            contactNumber: req.body.contactNumber}, function(err, result) {
            if (err)
              next(err);
            else {
              sendMailOnRegister(result);
              res.json({code: 1, status: 'success',
                message: 'User added successfully!!!', data: result});
            }
          });
        } else
          res.json({code: 0, status: 'Failure',
            message: 'There is already an account with this email.',
            data: null});
      },
      (err) => { console.error(err); },
    );
  },

  login: function(req, res, next) {
    userModel.findOne({email: req.body.email}, function(err, userInfo){
      if (err) {
        next(err);
      } else {
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
          const token = jwt.sign({id: userInfo._id},
            req.app.get('secretKey'), { expiresIn: '1h' });
          res.cookie('token', token, {
            maxAge: 1000 * 60 * 60, // 1 hour
          });
          sendEmailOnSignIn(userInfo);
          printUsers();
          res.json({code: 1, status: 'success',
            message: 'user found!!!', data: {user: userInfo, token: token}});
        } else {
          res.json({code: 0, status: 'error',
            message: 'Invalid email or password..', data: null});
        }
      }
    });
  },
  logout: function(req, res, next) {

    if (req.cookies.token){
      res.clearCookie('token');
      res.json({code: 1, status: 'success',
        message: 'Logged Out..', data: null});
    } else {
      res.json({code: 0, status: 'error',
        message: 'Log in first..', data: null});
    }
  },
  seeOptedEvents: function(req, res, next){
    eventModel.find({student: req.body.userId}, function(err, events){

      if (err)
        next(err);
      else
        res.json({status: 'success',
          message: 'Events fetched..', data: events});
    });
  },
};
