const mentorModel = require('../models/mentors');
const userModel = require('../models/Users');
const requestModel = require('../models/requests');
const eventModel = require('../models/events');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const { sendMailOnRegister,sendEmailOnSignIn, sendEmailOnApproval } = require('../helpers/mail');
const { mentorKey } = require('../helpers/maps');
module.exports = {

 create: function(req, res, next) {
  
  mentorModel.create({ name: req.body.name, email: req.body.email, password: req.body.password ,age:req.body.age,contactNumber:req.body.contactNumber,dateOfBirth:req.body.dateOfBirth}, function (err, result) {
      if (err) 
       next(err);
      else{
         sendMailOnRegister(result);
         mentorKey(result._id,result.name);
         res.json({status: "success", message: "Mentor added successfully!!!", data: result});
      }
       
      
    });
 },

login: function(req, res, next) {
  mentorModel.findOne({email:req.body.email}, function(err, userInfo){
     if (err) {
      next(err);
     }else{
         if(bcrypt.compareSync(req.body.password, userInfo.password)) {
          const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
          sendEmailOnSignIn(userInfo);
          res.json({status:"success", message: "Mentor found!!!", data:{user: userInfo, token:token}});
         }else{
          res.json({status:"error", message: "Invalid email/password!!!", data:null});
         }
    }
  });
 },
 getRequests:function(req,res,next){
    console.log(req.body);
    requestModel.find({mentor:req.body.mentorId},function(err,requests){
       if(err)
        next(err);
       else
       res.json({status:"success",message:"Requests for the given mentor found.",data:requests});

    });

 },
}