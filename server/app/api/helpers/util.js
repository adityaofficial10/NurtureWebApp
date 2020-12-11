require('dotenv').config({
    path:'config/.env'
});

const userModel = require('../models/Users');
const mentorModel = require('../models/mentors');
const requestModel = require('../models/requests');
const eventModel = require('../models/events');
const slotModel = require('../models/slots');
const { nextTick } = require('process');


module.exports = {

    checkIntersection:function(slot1,slot2){

        const t1 = slot1.startTime; const T1 = slot2.startTime;
        const t2 = slot1.endTime; const T2 = slot2.endTime;
        console.log(slot1.date);
        console.log(slot2.date);
        if(T1<t1 && T2<t1)
        return false;
        else if(T1>t2 && T1>t2)
        return false;
        else if(slot1.date !== slot2.date)
        return false;
        else
        return true;
    },
    checkIfSlotAvailable:function(mentorId,slot){

        return slotModel.findOne({mentor:mentorId,startTime:slot.startTime,endTime:slot.endTime,date:slot.date}).then(
            (slotInfo)=>  slotInfo?Number(slotInfo.available):-1,
            (err) => err              
            ).catch((err)=>{
                console.error(err);
            });
    },
    checkIfExistsMentor:function(email,dateOfBirth){

        return mentorModel.find({email:email,dateOfBirth:dateOfBirth}).then(
            (mentor)=>mentor.length,
            (err)=>err,
        ).catch((err)=>{
            console.error(err);
        });
    },
};