
import instance from './api';
import querystring from "querystring";
import axios from 'axios';

axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

export function setAuthToken(token){

    if (token) {
        // Apply authorization token to every request if logged in   
        axios.defaults.headers.common['Authorization'] = token;
      }
    else{
        delete axios.defaults.headers.common['Authorization'];
    }
};

export async function login(email,password){

        const data = {
            'email':email,
            'password':password
        };
        const resp = await instance.post('/users/login',querystring.stringify(data),{withCredentials:true});
        return resp.data;
};

export async function signup(data){
    
    const mentorData = {
        'name':data.name,
        'email':data.email,
        'age':data.age,
        'password':data.password,
        'contactNumber':data.contactNumber,
    };
    const resp = await instance.post('/users/signup',querystring.stringify(mentorData));
    return resp.data;
};
export async function logout(){
   
    const resp = await axios.get('http://localhost:4000/users/logout',{withCredentials:true});
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

    const resp = await instance.post('/slots',querystring.stringify(data));
    return resp.data;
};

export async function seeScheduledEvents(){
    const resp = await instance.get('/request/events');
    return resp.data;
};

export async function getMentorDetails(){

    const resp = await axios.get('http://localhost:4000/request/mentor');
    return resp.data;
}
export async function getSlotsOfMentors(){
    
    const resp = await axios.get('http://localhost:4000/userDashboard/slots',{withCredentials:true});
    console.log(resp.data);
    return resp.data;
};
export async function bookSlot(d){

    const de = {
        'title':'Event',
        'description':'Testing going on.',
        'mentorId':d.mentor,
        'mentorName':d.mentorName,
        'date':d.date,
        'startTime':d.startTime,
        'endTime':d.endTime
    };
    console.log(de);
    const resp = await instance.post('/events',querystring.stringify(de),{withCredentials:true});
    return resp.data;
}

export async function getUserDashboard(){

    let urlOne = 'http://localhost:4000/userDashboard/slots';
    let urlTwo = 'http://localhost:4000/userDashboard/event';
    
    const reqOne = axios.get(urlOne,{withCredentials:true});
    const reqTwo = axios.post(urlTwo,{},{withCredentials:true});
    const responses = await axios.all([reqOne,reqTwo]);
    
    const userData = {
        'slots':responses[0].data.data,
        'mentorDetails':responses[1].data.data,
    };
    if(responses[0].data.code === -1 || responses[1].data.code === -1)
    userData.authenticated = 0;
    else
    userData.authenticated = 1;
    console.log(userData);
    const def = {
        'mentorId':userData.mentorDetails?userData.mentorDetails.mentor:null
    };
    if(userData.mentorDetails !== null){
        const mentorInfo = await instance.post('http://localhost:4000/userDashboard/mentorDetails',querystring.stringify(def),{withCredentials:true});
        userData.mentorInfo = mentorInfo.data.data;
        console.log(userData);
        console.log("Success");
        return userData;
    }
    else{
        userData.mentorInfo = null;
        return userData;
    }
    
}