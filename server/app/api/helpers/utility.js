'use strict';
require('dotenv').config({
  path: 'config/.env',
});

const {checkIfSlotAvailable, getTimeFromInput} = require('./util');


module.exports = {

  getTimeFromInput: function(time){

    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();

    const t = hours.toString() + ':' +
    minutes.toString() + ':' + seconds.toString();
    return t;
  },
  isGreater: function(time1, time2){
    var t1 = getTimeFromInput(time1);
    var t2 = getTimeFromInput(time2);

    return (t1 > t2);
  },
  convertTimeFromStandard: function(time, date){
    const ti = time.toString();
    const t = date.toString() + 'T' + ti;
    return t;
  },

  checkIfFree: function(mentorId, slot){
    return checkIfSlotAvailable(mentorId, slot).then(
      (ok) => ok,
      (err) => err,
    );
  },

};
