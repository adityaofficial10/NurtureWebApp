import instance from './api';
import { setHeader } from './api'
import querystring from "querystring";
import axios from 'axios';

export async function login(email,password){

        const data = {
            'email':email,
            'password':password
        };
        const resp = await instance.post('/mentors/login',querystring.stringify(data));
        return resp.data;
};

export async function signup(data){
    
    const mentorData = {
        'name':data.name,
        'email':data.email,
        'age':data.age,
        'password':data.password,
        'dateOfBirth':data.dateOfBirth,
        'contactNumber':data.contactNumber,
    };
    const resp = await instance.post('/mentors/signup',querystring.stringify(mentorData));
    return resp.data;
};

export async function fetchMentors(){
   
    const mentors = await instance.get('/mentors/getAll');
    return mentors.data.data;
};

export async function putSlot(token,mentorId,date,startTime,endTime){
     
    const data = {
     'mentorId':mentorId,
     'date':date,
     'startTime':startTime,
     'endTime':endTime
    };

    const resp = await instance.post('/slots',querystring.stringify(data),{headers:{'x-access-token':token}});
    return resp.data.data;
};

export async function seeScheduledEvents(token){
    const resp = await instance.get('/request/events',{headers:{'x-access-token':token}});
    return resp.data.data;
};

export async function getSlotsForMentor(token){
    const data = {};
    const inst = axios.create({
        baseURL: 'http://localhost:4000/',
        port:4000,
        headers:{
          "Content-Type":'application/x-www-form-urlencoded',
          "x-access-token":token
        }
    });
    const resp = await inst.get('/slots',querystring.stringify(data));
    return resp.data;
};
