'use strict';
require('dotenv').config({
  path: 'config/.env',
});

const mongoose = require('mongoose');
const username = process.env.ATLAS_USERNAME;
const password = process.env.ATLAS_PASSWORD;
const DB = process.env.MONGO_DATABASE_NAME;
const mongoDB =
`mongodb+srv://${username}:` +
`${password}@cluster0.jgt5f.mongodb.net/${DB}?retryWrites=true&w=majority`;
let connect = mongoose.createConnection(mongoDB,
  {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;


module.exports = {
  connection: connect,
  mongoURI: mongoDB,
};
