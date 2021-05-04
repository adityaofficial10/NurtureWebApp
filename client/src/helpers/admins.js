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
        const resp = await instance.post('/admins/login',querystring.stringify(data),{withCredentials:true});
        return resp.data;
};


export async function logout(){
   
    const resp = await axios.get('http://localhost:4000/admins/logout',{withCredentials:true});
    return resp.data;
};

export async function getAdminDashboard(){

    let urlOne = 'http://localhost:4000/mentors/getAll';
    
    const response = await instance.get(urlOne,{withCredentials:true});
    
    const adminData = {
        'mentors':response.data.data,
    };
    if(response.data.code === -1 || response.data.code === -1)
    adminData.authenticated = 0;
    else
    adminData.authenticated = 1;
    return adminData;
}