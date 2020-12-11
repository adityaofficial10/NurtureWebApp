import instance from './api';
import querystring from "querystring";

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
    return mentors.data;
};

export async function putSlot(token,mentorId,date,startTime,endTime){
     
    const data = {
     'mentorId':mentorId,
     'date':date,
     'startTime':startTime,
     'endTime':endTime
    };

    const resp = await instance.post('/slots',querystring.stringify(data),{headers:{'x-access-token':token}});
    return resp.data;
};

export async function seeScheduledEvents(token){
    const resp = await instance.get('/request/events',{headers:{'x-access-token':token}});
    return resp.data;
};

export async function getSlotsForMentor(){
    
    const resp = await instance.post('/slots');
    return resp.data;
};
