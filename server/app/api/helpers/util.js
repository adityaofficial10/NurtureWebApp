'use strict';
require('dotenv').config({
  path: 'config/.env',
});

let MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY',
  'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];


module.exports = {

  checkIntersection: function(slot1, slot2){

    const t1 = slot1.startTime; const T1 = slot2.startTime;
    const t2 = slot1.endTime; const T2 = slot2.endTime;
    console.log(slot1.date);
    console.log(slot2.date);
    if (T1 < t1 && T2 < t1)
      return false;
    else if (T1 > t2 && T1 > t2)
      return false;
    else if (slot1.date !== slot2.date)
      return false;
    else
      return true;
  },
  checkIfSlotAvailable: function(mentorId, slot){
    return slotModel.find({
      startTime: slot.startTime,
      endTime: slot.endTime, mentor: mentorId}).then(
      (slotInfo) => slotInfo.length ? Number(slotInfo[0].available) : -1,
      (err) => err,
    ).catch((err) => {
      console.error(err);
    });
  },
  checkIfExistsMentor: function(email){

    return mentorModel.find({email: email}).then(
      (mentor) => mentor.length,
      (err) => err,
    ).catch((err) => {
      console.error(err);
    });
  },
  checkIfExistsAdmin: function(email){

    return adminModel.find({email: email}).then(
      (admin) => admin.length,
      (err) => err,
    ).catch((err) => {
      console.error(err);
    });
  },
  checkIfUserExists: function(email){

    return userModel.find({email: email}).then(
      (user) => user.length,
      (err) => err,
    ).catch((err) => {
      console.error(err);
    });
  },
  convertTimeToStandard: function(time){

    var date = new Date(time);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var newformat = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const newTime = String(hours + ':' + minutes + ' ' + newformat);
    return newTime;
  },
  convertDateToStandard: function(time) {
    var date = new Date(time);
    var day = date.getDate();
    var month = date.getMonth();
    var res = day + ' ' + MONTHS[month];
    console.log(res);
    return res;
  },
  compareTime: function(t1, t2){

    t1 = new Date(t1);
    t2 = new Date(t2);
    t1.setHours(0, 0, 0, 0);
    t2.setHours(0, 0, 0, 0);
    return (t1.valueOf() === t2.valueOf());
  },
};
