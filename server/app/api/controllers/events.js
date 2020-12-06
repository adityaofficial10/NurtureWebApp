const eventModel = require('../models/events');

module.exports = {
 getById: function(req, res, next) {
  console.log(req.body);
  eventModel.findById(req.params.eventId, function(err, eventInfo){
   if (err) {
    next(err);
   } else {
    res.json({status:"success", message: "Event found!!!", data:{events: eventInfo}});
   }
  });
 },
getAll: function(req, res, next) {
  let eventsList = [];
eventModel.find({}, function(err, events){
   if (err){
    next(err);
   } else{
    for (let event of events) {
     eventsList.push({id: event._id, title: event.title, date: event.date,time:event.startTime});
    }
    res.json({status:"success", message: "Events list found!!!", data:{events: eventsList}});
       
   }
});
 },
updateById: function(req, res, next) {
  eventModel.findByIdAndUpdate(req.params.eventId,{title:req.body.title}, function(err, eventInfo){
if(err)
    next(err);
   else {
    res.json({status:"success", message: "Event updated successfully!!!", data:eventInfo});
   }
  });
 },
deleteById: function(req, res, next) {
  eventModel.findByIdAndRemove(req.params.eventId, function(err, eventInfo){
   if(err)
    next(err);
   else {
    res.json({status:"success", message: "Event deleted successfully!!!", data:eventInfo});
   }
  });
 },
create: function(req, res, next) {
  console.log(req.body);
  eventModel.create({ title: req.body.title,description:req.body.description,mentor:req.body.mentorId,student:req.body.studentId, date: req.body.date,startTime:req.body.startTime,endTime:req.body.endTime }, function (err, result) {
      if (err) 
       next(err);
      else
       res.json({status: "success", message: "Event added successfully!!!", data: result});
      
    });
 },
};