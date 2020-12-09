const slotModel = require('../models/slots');
const { convertTimeFromStandard, getTimeFromInput } = require('../helpers/utility');
const { login } = require('./mentors');

module.exports = {
 getById: function(req, res, next) {
  slotModel.findById(req.params.slotId, function(err, slotInfo){
   if (err) {
    next(err);
   } else {
    res.json({status:"success", message: "Slot found!!!", data:{slot: slotInfo}});
   }
  });
 },
getAll: function(req, res, next) {
  let slotsList = [];
  console.log(req.body);
  let today = new Date(req.query.date);
slotModel.find({available:true}, function(err, slots){
   if (err){
    next(err);
   } else{
    for (let slot of slots) {
     if(slot.date === today)
     slotsList.push({id: slot._id, mentor: slot.mentor, date:slot.date,startTime:slot.startTime,endTime:slot.endTime});
    }
    res.json({status:"success", message: "Slots list found!!!", data:{slots: slotsList}});
       
   }
});
 },
updateById: function(req, res, next) {
  slotModel.findByIdAndUpdate(req.params.slotId,{startTime:req.body.startTime,endTime:req.body.endTime,date:req.body.date}, function(err, slotInfo){
if(err)
    next(err);
   else {
    res.json({status:"success", message: "Slot updated successfully!!!", data:slotInfo});
   }
  });
 },
deleteById: function(req, res, next) {
  slotModel.findByIdAndRemove(req.params.slotId, function(err, slotInfo){
   if(err)
    next(err);
   else {
    res.json({status:"success", message: "Slot deleted successfully!!!", data:slotInfo});
   }
  });
 },
create: function(req, res, next) {
  console.log(req.body.date);
  slotModel.create({ mentor: req.body.mentorId,startTime:req.body.startTime,endTime:req.body.endTime,date:req.body.date}, function (err, result) {
      if (err) 
       next(err);
      else
       res.json({status: "success", message: "Slot added successfully!!!", data: result});
      
    });
 },
};