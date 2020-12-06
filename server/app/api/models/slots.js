const mongoose = require('mongoose');

//Define a schema

const Schema = mongoose.Schema;

const SlotSchema = new Schema({

    mentor:{
      type:Schema.Types.ObjectId,
      ref:'mentors',
      required:true
    },
    startTime:{
      type:Date,
      required:true
    },
    endTime:{
      type:Date,
      required:true
    },
    firstDate:{
      type:Date,
      required:true
    },
    lastDate:{
      type:Date,
      required:true
    }
  });

module.exports = mongoose.model('Slot', SlotSchema);