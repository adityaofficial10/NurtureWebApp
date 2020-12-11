import instance from './api';
import querystring from "querystring";
import axios from 'axios';

export async function login(email,password){

        const data = {
            'email':email,
            'password':password
        };
        const resp = await instance.post('/users/login',querystring.stringify(data));
        return resp.data;
};

export async function signup(data){
    
    const userData = {
        'name':data.name,
        'email':data.email,
        'age':data.age,
        'password':data.password,
        'dateOfBirth':data.dateOfBirth,
        'contactNumber':data.contactNumber,
    };
    const resp = await instance.post('/users/signup',querystring.stringify(userData));
    return resp.data;
};


export async function chooseSlot(title,description,token,mentorId,date,startTime,endTime){
     
    const data = {
     'title':title,
     'description':description,   
     'mentorId':mentorId,
     'date':date,
     'startTime':startTime,
     'endTime':endTime
    };
    const inst = axios.create({
        baseURL: 'http://localhost:4000/',
        port:4000,
        headers:{
          "Content-Type":'application/x-www-form-urlencoded',
          "x-access-token":token
        }
    });
    const resp = await inst.post('/events',querystring.stringify(data));
    return resp.data;
};

export async function seeOptedEvents(token){

    const inst = axios.create({
        baseURL: 'http://localhost:4000/',
        port:4000,
        headers:{
          "Content-Type":'application/x-www-form-urlencoded',
          "x-access-token":token
        }
    });
    const resp = await inst.get('/users/events');
    return resp.data;
};
