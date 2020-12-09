const {convertTimeFromStandard} = require('./app/api/helpers/utility.js');
const eventModel = require('./app/api/models/events');
const time = "13:00:00";
const mongoose = require('mongoose');

const mongoDB = `mongodb://localhost:27017/testDB`;
mongoose.connect(mongoDB,{useNewUrlParser:true,useUnifiedTopology:true});

const evt = new eventModel({ title: 'Nothing',description:'Nothing',mentor:"5fcd1a4323b7ec665a4b5664",student:'5fcd11cac9f74465eeb0d619', date: '2020-12-23',startTime:'2020-12-23T16:00:00',endTime:'2020-12-23T17:00:00' });

evt.save(function(err,eventInfo){
    if(err)
     console.error(err);
    else
     console.log(eventInfo);
});