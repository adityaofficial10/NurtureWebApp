'use strict';

module.exports = {
  getById: function(req, res, next) {

    eventModel.findById(req.params.eventId, function(err, eventInfo){
      if (err) {
        next(err);
      } else {
        res.json({status: 'success',
          message: 'Event found!!!', data: {events: eventInfo}});
      }
    });
  },
  getAll: function(req, res, next) {
    let eventsList = [];
    eventModel.find({}, function(err, events){
      if (err){
        next(err);
      } else {
        for (let event of events) {
          eventsList.push({id: event._id, title: event.title,
            date: event.date, time: event.startTime});
        }
        res.json({status: 'success',
          message: 'Events list found!!!', data: {events: eventsList}});

      }
    });
  },
  getEventForStudent: function(req, res, next) {

    eventModel.findOne({mentee: req.body.userId}, function(err, userInfo){
      if (err)
        next(err);
      else {
        if (userInfo)
          res.json({code: 1, status: 'success',
            msg: 'Event Found!', data: userInfo});
        else
          res.json({code: 0, status: 'failure',
            msg: 'Event not Found!', data: null});
      }
    });
  },
  updateById: function(req, res, next) {
    eventModel.findByIdAndUpdate(req.params.eventId, {title: req.body.title},
      function(err, eventInfo){
        if (err)
          next(err);
        else {
          res.json({status: 'success',
            message: 'Event updated successfully!!!', data: eventInfo});
        }
      });
  },
  deleteById: function(req, res, next) {
    eventModel.findByIdAndRemove(req.params.eventId, function(err, eventInfo){
      if (err)
        next(err);
      else {
        res.json({status: 'success',
          message: 'Event deleted successfully!!!', data: eventInfo});
      }
    });
  },
  cancelEngagement: function(req, res, next) {
    eventModel.findOneAndDelete({mentee: req.body.userId},
      function(err, event) {
        if (err)
          next(err);
        else {
          if (event) {
            sessionModel.deleteMany({mentee: req.body.userId,
              mentor: event.mentor}, function(err) {
              if (err)
                next(err);
              else
                res.json({code: 1, msg: 'success', data: null});
            });
          } else {
            res.json({code: 1, msg: 'no sessions', data: null});
          }
        }
      });
  },
};
