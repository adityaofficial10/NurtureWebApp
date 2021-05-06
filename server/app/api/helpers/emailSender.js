'use strict';
require('dotenv').config({
  path: 'config/.env',
});

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

module.exports = {
  transporter,
};
