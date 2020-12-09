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
    date:{
      type:Date,
      required:true
    },
    available:{
      type:Boolean,
      default:true
    }
  });

module.exports = mongoose.model('Slot', SlotSchema);