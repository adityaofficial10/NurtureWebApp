require('dotenv').config({
    path:'config/.env'
});

const userModel = require('../models/Users');
const mentorModel = require('../models/mentors');
const requestModel = require('../models/requests');
const eventModel = require('../models/events');
const slotModel = require('../models/slots');
const { nextTick } = require('process');
const {checkIfFree} = require('./utility');
const { sendEmailOnApproval } = require('./mail');

module.exports = {

    allotSlot:function(userName,event,slot){
            
            return checkIfFree(event.mentor,slot).then(
                (ok)=>ok,
                (err)=>err
            );           
    },
};