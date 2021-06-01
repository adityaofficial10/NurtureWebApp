'use strict';
require('dotenv').config({
  path: 'config/.env',
});

const { transporter } = require('./emailSender');
const { convertDateToStandard, convertTimeToStandard } = require('./util');
const EMAIL = process.env.EMAIL;

module.exports = {

  sendMailOnRegister: function(user){

    var emailText = `Dear ${user.name},` +
     ' \nYou have registered successfully on Nurture.\n Thank you';
    var mailOptions = {
      from: EMAIL,
      to: user.email,
      subject: 'Nurture Registration Successful',
      text: emailText,
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

    var emailText = `Dear ${user.name},` +
    ' \nWe have detected a login on your Nurture account.\n Thank you';
    var mailOptions = {
      from: EMAIL,
      to: user.email,
      subject: 'Nurture Login Notification',
      text: emailText,
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  },
  sendEmailOnApproval: function(user, slot){

    var emailText = `Dear ${user.name},` +
    ' \nYour request for a slot has been approved.' +
    '\nSlot Details are as follows:' +
     // eslint-disable-next-line max-len
     `\n1.Date: ${convertDateToStandard(slot.date)}\n2.Time: ${convertTimeToStandard(slot.startTime)}.` +
      '\nCheck your dashboard for more details.\n Thank you';
    var mailOptions = {
      from: EMAIL,
      to: user.email,
      subject: 'Nurture Request Approval Notification',
      text: emailText,
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

