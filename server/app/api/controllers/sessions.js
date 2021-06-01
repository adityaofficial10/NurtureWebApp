/* eslint-disable no-undef */
'use strict';
const { allotSlot } = require('../helpers/allotSlot');
const { sendEmailOnApproval } = require('../helpers/mail');
const { convertTimeToStandard, convertDateToStandard } =
  require('../helpers/util');

module.exports = {
  getSessionsForMentors: function(req, res, next) {
    let mentorId = req.body.mentorId;
    var sessionsList = [];
    // eslint-disable-next-line no-undef
    sessionModel.find({mentor: mentorId, completed: false},
      function(err, sessions) {
        if (err)
          throw err;
        else {
          if (!sessions.length) {
            res.json({status: 'success',
              message: 'There are no slots associated with this mentor',
              data: null});
          } else {
            for (var x = 0; x < sessions.length; x++) {
              sessionsList.push({
                menteeName: sessions[x].menteeName,
                startTime: convertTimeToStandard(sessions[x].startTime),
                date: convertDateToStandard(sessions[x].date),
                sessionNumber: sessions[x].sessionNumber,
                scheduled: true,
                completed: sessions[x].completed,
                link: sessions[x].link,
                pending: sessions[x].startTime < new Date(),
              });
            }
            res.json({status: 'success',
              message: 'The sessions have been fetched.',
              data: {sessions: sessionsList}});
          }
        }
      });
  },
  getSessionsForUsers: function(req, res, next) {
    let mentee = req.body.userId;
    var sessionsList = [];
    // eslint-disable-next-line no-undef
    sessionModel.find({mentee: mentee}).sort('sessionNumber').exec(
      function(err, sessions) {
        if (err)
          throw err;
        else {
          console.log(sessions);
          if (!sessions.length) {
            res.json({status: 'success',
              message: 'There are no slots associated with this mentor',
              data: null});
          } else {
            for (var x = 0; x < sessions.length; x++) {
              sessionsList.push({
                mentor: sessions[x].mentor,
                mentorName: sessions[x].mentorName,
                startTime: convertTimeToStandard(sessions[x].startTime),
                date: convertDateToStandard(sessions[x].date),
                sessionNumber: sessions[x].sessionNumber,
                scheduled: true,
                completed: sessions[x].completed,
                pending: sessions[x].startTime < new Date(),
              });
            }
            if (sessionsList.length < 4) {
              var last = sessionsList.length - 1 >= 0 ?
                sessionsList.length - 1 : 0;
              var n = sessionsList.length + 1;
              while (n <= 4) {
                sessionsList.push({
                  mentor: sessionsList[last].mentor,
                  mentorName: sessionsList[last].mentorName,
                  startTime: null,
                  date: null,
                  sessionNumber: n,
                  scheduled: false,
                  completed: false,
                  pending: false,
                });
                n++;
              }
            }
            res.json({status: 'success',
              message: 'The sessions have been fetched.',
              data: sessionsList});
          }
        }
      });
  },
  getSessionCountForMentors: function(req, res, next) {
    var temp;
    // eslint-disable-next-line no-undef
    var sessionsMap = new Map();
    eventModel.find({}, function(err, events) {
      if (err)
        throw err;
      else {
        if (events) {
          for (var x = 0; x < events.length; x++) {
            if (sessionsMap.has(events[x].mentor)) {
              temp = sessionsMap.get(events[x].mentor);
              sessionsMap.set(events[x].mentor, temp + events[x].sessions);
            } else {
              sessionsMap.set(events[x].mentor, events[x].sessions);
            }
          }
          res.json({status: 'success',
            data: sessionsMap});
        } else {
          res.json({status: 'success',
            data: null});
        }
      }
    });
  },
  createSession: async function(req, res, next) {
    console.log(req.body);
    var session = await sessionModel.findOne({mentee: req.body.userId,
      mentor: req.body.mentorId}).sort('-sessionNumber').exec();
    let sessionNumber = 1;
    console.log(session);
    if (session)
      sessionNumber = session.sessionNumber + 1;
    else {
      var evt = await eventModel.create({
        title: 'Interaction with' + req.body.userName,
        description: 'General Talk',
        mentor: req.body.mentorId,
        mentorName: req.body.mentorName,
        mentee: req.body.userId,
        menteeName: req.body.userName,
        sessions: 0,
      });
      if (!evt)
        res.json({code: -1,
          message: 'Sorry, there was a problem. Try again later.', data: null});
    }
    let data = {
      mentor: req.body.mentorId,
      mentorName: req.body.mentorName,
      mentee: req.body.userId,
      menteeName: req.body.userName,
      startTime: req.body.startTime,
      link: '',
      endTime: req.body.endTime,
      date: req.body.date,
      sessionNumber: sessionNumber,
      completed: false,
    };
    console.log(data);
    // eslint-disable-next-line new-cap
    var newSession = new sessionModel(data);
    // eslint-disable-next-line no-unused-vars
    const dt = allotSlot(req.body.userName, newSession, {
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      date: req.body.date}).then((ok) => {

      if (ok === 1){

        slotModel.updateOne({
          startTime: req.body.startTime,
          endTime: req.body.endTime,
          mentor: req.body.mentorId},
        {available: false}, function(err, slotInfo){
          if (err)
            next(err);
          else {
            sendEmailOnApproval(
              {name: req.body.userName,
                email: req.body.userEmail},
              {startTime: req.body.startTime,
                endTime: req.body.endTime,
                date: req.body.date});
          }
        });
        newSession.save(function(err, sessionInfo){
          if (err)
            next(err);
          else
            res.json({code: 1, status: 'success',
              message: 'The slot is booked successfully..', data: sessionInfo});
        });
      } else if (ok === 0)
        res.json({code: 0, status: 'failure',
          message: "Sorry, this request can't be completed.Try another slot...",
          data: null});
      else
        res.json({code: 0, status: 'failure',
          message: "Sorry, this slot doesn't exist..", data: null});

    });
  },
  completeSession: async function(req, res, next) {
    console.log(req.body);
    if (req.body.sessionNumber) {
      if (req.body.sessionNumber < 4) {
        eventModel.updateOne({
          mentee: req.body.userId,
          mentor: req.body.mentorid,
        }, {
          sessions: req.body.sessionNumber,
        }, function(err, eventInfo) {
          if (err)
            throw err;
          else {
            sessionModel.updateOne({
              mentor: req.body.mentorid,
              mentee: req.body.userId,
              sessionNumber: req.body.sessionNumber,
            }, {
              completed: true,
            }, function(err, session) {
              if (err)
                throw err;
              else {
                console.log(session);
                res.json({code: 1,
                  message: 'The session has been completed.',
                  data: eventInfo});
              }
            });
          }
        });
      } else {
        eventModel.findOneAndDelete({
          mentee: req.body.userId,
          mentor: req.body.mentorid,
        }, function(err, eventInfo) {
          if (err)
            throw err;
          else {
            sessionModel.deleteMany({
              mentee: req.body.userId,
              mentor: req.body.mentorid,
            }, function(err) {
              if (err)
                throw err;
              else {
                res.json({code: 2,
                  message: 'All sessions have been completed with this mentor.',
                  data: null});
              }
            });
          }
        });
      }
    }
  },
};
