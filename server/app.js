const express = require('express');
const cors = require('cors');
const multer = require("multer");
const fileupload = require("express-fileupload");
const path = require("path");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const _ = require('lodash');
const aws = require("aws-sdk");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(morgan('dev'));


const data = require("./datastore.js");

app.listen(3000,function(err){
  if(err)
  console.error(err);
  else
  console.log("Server running on port 3000...");
});
