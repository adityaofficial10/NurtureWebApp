const requestModel = require('../models/requests');

module.exports = {
 getById: function(req, res, next) {
  console.log(req.body);
  requestModel.findById(req.params.requestId, function(err, requestInfo){
   if (err) {
    next(err);
   } else {
    res.json({status:"success", message: "Request found!!!", data:{request: requestInfo}});
   }
  });
 },
getAll: function(req, res, next) {
  let requestsList = [];
requestModel.find({}, function(err, requests){
   if (err){
    next(err);
   } else{
    for (let request of requests) {
     requestsList.push({id: request._id, title: request.title, date: request.date,time:request.startTime});
    }
    res.json({status:"success", message: "Requests list found!!!", data:{requests: requestsList}});
       
   }
});
 },
updateById: function(req, res, next) {
  requestModel.findByIdAndUpdate(req.params.requestId,{title:req.body.title}, function(err, requestInfo){
if(err)
    next(err);
   else {
    res.json({status:"success", message: "Request updated successfully!!!", data:requestInfo});
   }
  });
 },
deleteById: function(req, res, next) {
  requestModel.findByIdAndRemove(req.params.requestId, function(err, requestInfo){
   if(err)
    next(err);
   else {
    res.json({status:"success", message: "Request deleted successfully!!!", data:requestInfo});
   }
  });
 },
create: function(req, res, next) {
  requestModel.create({ title: req.body.title,description:req.body.description,mentor:req.body.mentorId,student:req.body.studentId, date: req.body.date,startTime:req.body.startTime,endTime:req.body.endTime }, function (err, result) {
      if (err) 
       next(err);
      else
       res.json({status: "success", message: "Request added successfully!!!", data: result});
      
    });
 },
};