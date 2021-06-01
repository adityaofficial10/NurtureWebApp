'use strict';
const { convertTimeToStandard, compareTime } = require('../helpers/util');

module.exports = {
  getById: function(req, res, next) {
    slotModel.findById(req.params.slotId, function(err, slotInfo) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: 'success',
          message: 'Slot found!!!',
          data: {
            slot: slotInfo,
          },
        });
      }
    });
  },
  getAll: function(req, res, next) {

    let slotsList = [];
    let today = new Date();
    slotModel.find({
      available: true,
    }).then(
      (err) => next(err),
      (slots) => {
        console.log(slots);
        for (let slot of slots) {
          console.log(slot);
          if (compareTime(today, slot.date))
            slotsList.push({
              id: slot._id,
              mentor: slot.mentor,
              startTime: convertTimeToStandard(slot.startTime),
            });
        }
      },
    ).catch((err) => {
      console.error(err);
    }).finally(() => {
      if (slotsList.length)
        res.json({
          code: 1,
          status: 'success',
          message: 'Slots list found!!!',
          data: {
            slots: slotsList,
          },
        });
      else
        res.json({
          code: 0,
          status: 'failure',
          message: 'There are currently no slots available.',
          data: null,
        });
    });
  },
  updateById: function(req, res, next) {
    slotModel.findByIdAndUpdate(req.params.slotId, {
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      date: req.body.date,
    }, function(err, slotInfo) {
      if (err)
        next(err);
      else {
        res.json({
          status: 'success',
          message: 'Slot updated successfully!!!',
          data: slotInfo,
        });
      }
    });
  },
  deleteById: function(req, res, next) {
    slotModel.findByIdAndRemove(req.params.slotId, function(err, slotInfo) {
      if (err)
        next(err);
      else {
        res.json({
          status: 'success',
          message: 'Slot deleted successfully!!!',
          data: slotInfo,
        });
      }
    });
  },
  create: function(req, res, next) {
    console.log(req.body);
    mentorModel.findById(req.body.mentorId).then((mentorInfo) => {
      slotModel.create({
        mentor: req.body.mentorId,
        mentorName: req.body.mentorName,
        content: req.body.content,
        link: req.body.link,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        date: req.body.date,
      }, function(err, result) {
        if (err)
          next(err);
        else {
          res.json({
            code: 1,
            status: 'success',
            message: 'Slot added successfully!!!',
            data: result,
          });
        }
      });
    }).catch((err) => {
      console.error(err);
    });
  },
  getSlotsMentorWise: function(req, res, next) {

    let slotsList = [];
    let rawSlots = [];
    slotModel.find({
      available: true,
    }, function(err, slots) {
      if (err) {
        next(err);
      } else {
        console.log(slots);
        for (let slot of slots) {
          if (compareTime(new Date(req.body.date), slot.date)) {
            slotsList.push({
              mentorId: slot.mentor,
              mentor: slot.mentorName,
              startTime: convertTimeToStandard(slot.startTime),
              content: slot.content,
            });
            rawSlots.push(slot);
          }
        }
        if (slotsList.length)
          res.json({
            code: 1,
            status: 'success',
            message: 'Slots list found!!!',
            data: {
              slotsList: slotsList,
              rawSlots: rawSlots,
            },
          });
        else
          res.json({
            code: 0,
            status: 'failure',
            message: 'There are currently no slots available.',
            data: null,
          });
      }
    });

  },

};
