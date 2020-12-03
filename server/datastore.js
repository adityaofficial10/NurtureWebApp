const express = require("express");

const mongoose = require('mongoose');
const autoIncrement = require("mongoose-auto-increment");
const { Schema } = require("mongoose");


var connection = mongoose.createConnection("mongodb://localhost:27017/checkDB");
//const connection = mongoose.connect('mongodb://localhost:27017/checkDB', {useMongoClient:true}).then((res)=>{
if(connection)
console.log("Database connected successfully..");
  //console.log("Database connected successfully...");
//});

autoIncrement.initialize(connection);


const mentorSchema = new Schema({

  mentorId:{
    type:Number
  },
  name:{
    type:String,
    required:true
  },
  age:{
    type:Number,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  available:{
    type:Boolean,
    default:true
  },
  contactNumber:{
    type:String,
  },
  dateOfBirth:{
    type:Date,
    required:true
  },
  mentorPassword:{
    type:String,
    required:true
  }
});

mentorSchema.plugin(autoIncrement.plugin, {
    model: 'Mentor',
    field:'mentorId',
    startAt: 1,
    incrementBy: 1
});

const userSchema = new Schema({

  userId:{
    type:Number
  },
  name:{
    type:String,
    required:true
  },
  age:{
    type:Number,
    required:true
  },
  email:{
    type:String,
    required:true
  },

  contactNumber:{
    type:String,
  },
  dateOfBirth:{
    type:Date,
    required:true
  },
  studentPassword:{
    type:String,
    required:true
  }
});

userSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field:'userId',
    startAt: 1,
    incrementBy: 1
});

const eventSchema = new Schema({

  eventId:{
    type:Number
  },

  title:{
    type:String,
    required:true
  },
  description:{
    type:String
  },
  mentor: {
    type:Schema.Types.Number,
    ref:'mentors',
    required:true
  },
  student: {
    type:Schema.Types.Number,
    ref:'users',
    required:true
  },
  date:{
    type:Date,
    required:true
  },
  startTime:{
    type:Date,
    required:true
  },
  endTime:{
    type:Date,
    required:true
  }
});

eventSchema.plugin(autoIncrement.plugin, {
    model: 'Event',
    field:'eventId',
    startAt: 1,
    incrementBy: 1
});

const requestSchema = new Schema({

  requestId:{
    type:Number
  },
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  student:{
    type:Schema.Types.Number,
    ref:'users',
    required:true
  },
  mentor:{
    type:Schema.Types.Number,
    ref:'mentors',
    required:true
  },
  date:{
    type:Date,
    required:true
  },
  startTime:{
    type:Date,
    required:true
  },
  endTime:{
    type:Date,
    required:true,
  },
  duration:{
    type:Date
  }
});

requestSchema.plugin(autoIncrement.plugin, {
    model: 'Request',
    field:'requestId',
    startAt: 1,
    incrementBy: 1
});

const slotSchema = new Schema({

  slotId:{
    type:Number
  },
  mentor:{
    type:Schema.Types.Number,
    ref:'mentors',
    required:true
  },
  date:{
    type:Date,
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

slotSchema.plugin(autoIncrement.plugin, {
    model: 'Slot',
    field:'slotId',
    startAt: 1,
    incrementBy: 1
});

const Mentor = connection.model('Mentor',mentorSchema);
const User = connection.model('User',userSchema);
const Event = connection.model('Event',eventSchema);
const Request = connection.model('Request',requestSchema);
const Slot = connection.model('Slot',slotSchema);


/*
const mtr = Mentor.findOne({name:"Jack"},'_id mentorId');
const st = User.findOne({name:"Aditya"},'_id userId');


const req = new Request({
  title:"Stranger Things",
  description:"Nothing",
  mentor:mtr._fields._id,
  student:st._fields._id,
  date:"2020-12-19",
  startTime:"2020-12-19T08:00:00",
  endTime:"2020-12-19T11:00:00",
  duration:dur
});

req.save(function(err){

  if(err) console.error(err);

  console.log("Success");
});
*/


module.exports = {
  Mentor,
  User,
  Event,
  Request,
  Slot
};
