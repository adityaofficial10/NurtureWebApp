'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {sendMailOnRegister, sendEmailOnSignIn} = require('../helpers/mail');
const {checkIfExistsMentor} = require('../helpers/util');

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
            contactNumber: req.body.contactNumber,
          }, function(err, result) {
            if (err)
              next(err);
            else {
              sendMailOnRegister(result);
              res.json({
                code: 1,
                status: 'success',
                message: 'Mentor added successfully!!!',
                data: result,
              });
            }
          });
        } else
          res.json({
            code: 0,
            status: 'Failure',
            message: 'There is already an account with this email.',
            data: null,
          });
      },
      (err) => {
        console.error(err);
      },
    );
  },

  login: function(req, res, next) {
    console.log(req.body);
    mentorModel.findOne({
      email: req.body.email,
    }, function(err, userInfo) {
      if (err) {
        next(err);
      } else {
        if (userInfo) {
          if (bcrypt.compareSync(req.body.password, userInfo.password)) {
            const token = jwt.sign({
              id: userInfo._id,
            }, req.app.get('secretKey'), {
              expiresIn: '1h',
            });
            res.cookie('token', token, {
              maxAge: 1000 * 60 * 60, // 1 hour
            });
            sendEmailOnSignIn(userInfo);
            res.json({
              code: 1,
              status: 'success',
              message: 'Mentor found!!!',
              data: {
                user: userInfo,
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
      res.json({code: 1, status: 'success',
        message: 'Logged Out..', data: null});
    } else {
      res.json({code: 0, status: 'error',
        message: 'Log in first..', data: null});
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
          status: 'success',
          message: 'Mentor found!!!',
          data: mentorInfo,
        });
      }
    });
  },
  getMentors: function(req, res, next) {
    let mentorList = [];
    var sessionsMap = {};
    var temp;
    mentorModel.find({}, function(err, mentors) {
      if (err)
        next(err);
      else {
        eventModel.find({}, function(err, events) {
          if (err)
            next(err);
          else {
            if (events) {
              for (var x = 0; x < events.length; x++) {
                if (sessionsMap[events[x].mentor]) {
                  temp = sessionsMap[events[x].mentor];
                  sessionsMap[events[x].mentor] = temp + events[x].sessions;
                } else {
                  sessionsMap[events[x].mentor] = events[x].sessions;
                }
              }
              for (let mentor of mentors) {
                var id = sessionsMap[mentor._id];
                mentorList.push({
                  id: mentor._id,
                  name: mentor.name,
                  email: mentor.email,
                  contactNumber: mentor.contactNumber,
                  available: mentor.available,
                  sessions: id,
                });
              }
              console.log(sessionsMap);
              console.log(mentorList);
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
          }
        });
      }
    });
  },
  getScheduledEvents: async function(req, res, next) {

    var menteesId = [];
    var menteesList = [];
    // eslint-disable-next-line no-undef
    eventModel.find({
      mentor: req.body.mentorId,
    }, function(err, events) {
      if (err)
        next(err);
      else {
        if (events && events.length){
          for (var x = 0; x < events.length; x++) {
            menteesId.push(events[x].mentee);
          }
          userModel.find({_id: { $in: menteesId }}, function(err, mentees) {
            if (err)
              next(err);
            else {
              if (!mentees || !mentees.length)
                res.json({code: 0, status: 'Failure',
                  msg: "You don't have a mentee yet.", data: null});
              for (var x = 0; x < events.length; x++) {
                menteesList.push({
                  menteeName: events[x].menteeName,
                  sessionsConducted: events[x].sessions,
                  email: mentees[x].email,
                  contactNumber: mentees[x].contactNumber,
                });
              }
              res.json({code: 1, status: 'Success',
                data: menteesList});
            }
          });
        } else
          res.json({code: 0, status: 'Failure',
            msg: "You don't have a mentee yet.", data: null});
      }
    });
  },
  getSlotsForMentor: function(req, res, next) {

    slotModel.find({
      mentor: req.body.mentorId,
    }, function(err, slots) {
      if (err)
        next(err);
      else
        res.json({
          status: 'success',
          message: 'Slots fetched..',
          data: slots,
        });
    });
  },
};
