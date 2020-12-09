require('dotenv').config({
    path:'config/.env'
});

const userModel = require('../models/Users');
const mentorModel = require('../models/mentors');
const requestModel = require('../models/requests');
const eventModel = require('../models/events');
const slotModel = require('../models/slots');
const { transporter } = require('./emailSender');
const EMAIL = process.env.EMAIL;

module.exports = {

  sendMailOnRegister: function(user){

    var emailText = `Dear ${user.name}, \nYou have registered successfully on Nurture.`;
    var mailOptions = {
      from: EMAIL,
      to: user.email,
      subject: 'Nurture Registration Successful',
      text: emailText
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
       console.log(error);
      } else {
       console.log('Email sent: ' + info.response);
      }
    });

  },
  sendEmailOnSignIn: function(user){

    var emailText = `Dear ${user.name}, \nWe have detected a login on your Nurture account.`;
    var mailOptions = {
      from: EMAIL,
      to: user.email,
      subject: 'Nurture Login Notification',
      text: emailText
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
       console.log(error);
      } else {
       console.log('Email sent: ' + info.response);
      }
    });

  },
  sendEmailOnApproval:function(user,slot){

    var emailText = `Dear ${user.name}, \nYour request for a slot has been approved.\nSlot Details are as follows:\n1.Date:${slot.date}\n2.Time:${slot.startTime}.\nCheck your dashboard for more details.`;
    var mailOptions = {
      from: EMAIL,
      to: user.email,
      subject: 'Nurture Request Approval Notification',
      text: emailText
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
       console.log(error);
      } else {
       console.log('Email sent: ' + info.response);
      }
    });


  },

};

