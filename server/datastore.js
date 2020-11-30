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
