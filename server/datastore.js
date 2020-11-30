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
    startAt: 1,
    incrementBy: 1
});

const studentSchema = new Schema({

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

studentSchema.plugin(autoIncrement.plugin, {
    model: 'Student',
    startAt: 1,
    incrementBy: 1
});

const Mentor = connection.model('Mentor',mentorSchema);
const Student = connection.model('Student',studentSchema);
