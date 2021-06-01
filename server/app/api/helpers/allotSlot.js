'use strict';
require('dotenv').config({
  path: 'config/.env',
});

const {checkIfFree} = require('./utility');

module.exports = {

  allotSlot: function(userName, session, slot){
    console.log(slot);
    return checkIfFree(session.mentor, slot).then(
      (ok) => ok,
      (err) => err,
    );
  },
};
