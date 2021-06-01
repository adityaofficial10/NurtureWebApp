import instance from './api';
import querystring from "querystring";
import axios from 'axios';

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
        const resp = await instance.post('http://localhost:4000/mentors/login',querystring.stringify(data),{withCredentials:true,});
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
    const resp = await instance.post('/mentors/signup',querystring.stringify(mentorData));
    return resp.data;
};

export async function fetchMentors(){
   
    const mentors = await instance.get('/mentors/getAll');
    return mentors.data.data;
};

export async function putSlot(date,startTime,endTime, content, link){
 
    date.setHours(0,0,0,0);
    const data = {
     'date':date.toString(),
     'startTime':startTime.toString(),
     'endTime':endTime.toString(),
     'content': content ? content : '',
     'link': link ? link : ''
    };
    console.log(data);
    const resp = await instance.post('/slots/',querystring.stringify(data),{withCredentials:true});
    return resp.data;
};

export async function getMentorDashboard(){
    const resp1 = await axios.post('http://localhost:4000/request/events',{},{withCredentials:true});
    const resp2 = await axios.post('http://localhost:4000/request/sessions', {}, {withCredentials: true});
    var mentorDashboard = {authenticated: true};
    if(resp1.data) {
        if(resp1.data.code === -1)
         mentorDashboard.authenticated = false;
        mentorDashboard.mentees = resp1.data.data;
    }
    if(resp2.data) {
        mentorDashboard.sessions = resp2.data.data ? resp2.data.data.sessions : null;
        if(resp2.data.code === -1)
         mentorDashboard.authenticated = false;
    }
    return mentorDashboard;
};

export async function getMentorDetails(){

    const resp = await axios.get('http://localhost:4000/request/mentor',{withCredentials:true});
    return resp.data;
}
export async function getSlotsForMentor(){
    
    const resp = await instance.get('/slots');
    return resp.data;
};
