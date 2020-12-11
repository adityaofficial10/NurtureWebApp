const userModel = require('../models/Users');
const eventModel = require('../models/events');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const { sendMailOnRegister,sendEmailOnSignIn } = require('../helpers/mail');
const { userKey,printUsers } = require('../helpers/maps');
 module.exports = {

 create: function(req, res, next) {
  
  userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password ,age:req.body.age,contactNumber:req.body.contactNumber,dateOfBirth:req.body.dateOfBirth}, function (err, result) {
      if (err) 
       next(err);
      else{
         sendMailOnRegister(result);
         userKey(result._id,result.name);
         res.json({status: "success", message: "User added successfully!!!", data: result});
      }
           
    });
 },

login: function(req, res, next) {
  userModel.findOne({email:req.body.email}, function(err, userInfo){
     if (err) {
      next(err);
     }else{
         if(bcrypt.compareSync(req.body.password, userInfo.password)) {
          const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
          sendEmailOnSignIn(userInfo);
          printUsers();
          res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});
         }else{
          res.json({status:"error", message: "Invalid email/password!!!", data:null});
         }
    }
  });
 },

 seeOptedEvents:function(req,res,next){
   eventModel.find({student:req.body.userId},function(err,events){

      if(err)
       next(err);
      else
       res.json({status:'success',message:'Events fetched..',data:events});
   });
 },
}