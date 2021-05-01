'use strict';
const requestModel = require('../models/requests');
const mentorModel = require('../models/mentors');
const slotModel = require('../models/slots');
const { allotSlot } = require('../helpers/allotSlot');

module.exports = {
  getById: function(req, res, next) {

    requestModel.findById(req.params.requestId, function(err, requestInfo){
      if (err) {
        next(err);
      } else {
        res.json({status: 'success',
          message: 'Request found!!!', data: {request: requestInfo}});
      }
    });
  },
  getAll: function(req, res, next) {
    let requestsList = [];
    requestModel.find({}, function(err, requests){
      if (err){
        next(err);
      } else {
        for (let request of requests) {
          requestsList.push({
            id: request._id,
            title: request.title,
            date: request.date,
            time: request.startTime});
        }
        res.json({status: 'success',
          message: 'Requests list found!!!', data: {requests: requestsList}});

      }
    });
  },
  updateById: function(req, res, next) {
    requestModel.findByIdAndUpdate(req.params.requestId,
      {title: req.body.title}, function(err, requestInfo){
        if (err)
          next(err);
        else {
          res.json({status: 'success',
            message: 'Request updated successfully!!!', data: requestInfo});
        }
      });
  },
  deleteById: function(req, res, next) {
    requestModel.findByIdAndRemove(req.params.requestId,
      function(err, requestInfo){
        if (err)
          next(err);
        else {
          res.json({status: 'success',
            message: 'Request deleted successfully!!!', data: requestInfo});
        }
      });
  },
  create: function(req, res, next) {
    requestModel.create({
      title: req.body.title,
      description: req.body.description,
      mentor: req.body.mentorId,
      student: req.body.userId,
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime }, function(err, result) {
      if (err)
        next(err);
      else {
        mentorModel.findById(req.body.mentorId, function(err, mentorInfo){
          if (err)
            throw err;
          slotModel.find({
            mentor: mentorInfo._id,
            startTime: result.startTime,
            endTime: result.endTime,
            date: result.date}, function(err, slot){
            if (err)
              next(err);
            else {
              const d = allotSlot(result, slot);
              if (d){
                res.json({status: 'success',
                  msg: 'Slot allotted..', data: slot});
              } else
                res.json({status: 'failed',
                  msg: 'This slot is occupied..', data: null});
            }
          });
        });
      }
    });
  },
  getRequestsByMentor: function(req, res, next) {
    mentorModel.findOne(req.params.mentorId, function(err, mentorInfo){
      if (err)
        next(err);
      else {
        console.log(mentorInfo._id);
        requestModel.find({mentor: mentorInfo._id.id}, function(err, requests){
          if (err)
            next(err);
          else
            res.json({status: 'success',
              message: 'Requests for the mentor found successfully..',
              data: requests});
        });
      }
    });
  },
};
