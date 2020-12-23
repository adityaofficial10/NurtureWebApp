const eventModel = require('../models/events');
const slotModel = require('../models/slots');
const { convertTimeFromStandard, getTimeFromInput } = require('../helpers/utility');
const { allotSlot } = require('../helpers/allotSlot');
const { userKey, mentorKey, getMentorName, getUserName } = require('../helpers/maps');
const { sendEmailOnApproval } = require('../helpers/mail');

module.exports = {
 getById: function(req, res, next) {

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
getEventForStudent: function(req,res,next) {

  eventModel.findOne({student:req.body.userId},function(err,userInfo){
    if(err)
     next(err);
    else{
      if(userInfo)
      res.json({code:1,status:'success',msg:'Event Found!',data:userInfo});
      else
      res.json({code:0,status:'failure',msg:'Event not Found!',data:null});
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

  const evt = new eventModel({ title: req.body.title,description:req.body.description,mentor:req.body.mentorId,mentorName:req.body.mentorName,student:req.body.userId, date: req.body.date,startTime:req.body.startTime,endTime:req.body.endTime });
  const dt = allotSlot(req.body.userName,evt,{startTime:req.body.startTime,endTime:req.body.endTime,date:req.body.date}).then((ok)=>{

    if(ok === 1){

      slotModel.updateOne({startTime:req.body.startTime,endTime:req.body.endTime,mentor:req.body.mentorId},{available:false},function(err,slotInfo){
        if(err)
         next(err);
        else{
          sendEmailOnApproval({name:req.body.userName,email:req.body.userEmail},{startTime:req.body.startTime,endTime:req.body.endTime,date:req.body.date});
        }
    });
      evt.save(function(err,eventInfo){
        if(err)
         next(err);
        else
        res.json({code:1,status:'success',message:'The slot is booked successfully..',data:eventInfo})
      });
    }
    else if(ok === 0)
    res.json({code:0,status:'failure',message:"Sorry, this request couldn't be completed.Try another slot...",data:null});
    else
    res.json({code:0,status:'failure',message:"Sorry, this slot doesn't exist..",data:null});

  });
 },
};
