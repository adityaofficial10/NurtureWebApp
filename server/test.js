const {convertTimeFromStandard} = require('./app/api/helpers/utility.js');
const eventModel = require('./app/api/models/events');
const time = "13:00:00";
const axios = require('axios');
/*const mongoose = require('mongoose');

const mongoDB = `mongodb://localhost:27017/testDB`;
mongoose.connect(mongoDB,{useNewUrlParser:true,useUnifiedTopology:true});

const evt = new eventModel({ title: 'Nothing',description:'Nothing',mentor:"5fcd1a4323b7ec665a4b5664",student:'5fcd11cac9f74465eeb0d619', date: '2020-12-23',startTime:'2020-12-23T16:00:00',endTime:'2020-12-23T17:00:00' });

evt.save(function(err,eventInfo){
    if(err)
     console.error(err);
    else
     console.log(eventInfo);
});*/
const headers = {
    'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmY2QxYTQzMjNiN2VjNjY1YTRiNTY2NCIsImlhdCI6MTYwNzU5NjMxMCwiZXhwIjoxNjA3NTk5OTEwfQ.elqvH7yPUuZo5eeFwsbUXINEc9FyUFWJWLu5rg-nFx0',
    'Content-Type':'application/x-www-form-urlencoded'
 };
var options = {
    host:'http://localhost:4000',
    path: '/slots',
    method: 'GET',
    headers: headers
};
const instance = axios.create({
    baseURL: 'http://localhost:3000/',
    port:3000,
    withCredentials: true,
});

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form- urlencoded';
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;

instance.get('http://localhost:3000/hello').then((res)=>{
    res.on('data',function(d){
        console.log(d);
    });
}).catch((err)=>{
    console.error(err);
});