'use strict';
require('dotenv').config({
  path: 'config/.env',
});

const {checkIfFree} = require('./utility');

module.exports = {

  allotSlot: function(userName, event, slot){
    console.log(slot);
    return checkIfFree(event.mentor, slot).then(
      (ok) => ok,
      (err) => err,
    );
  },
};
