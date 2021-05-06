'use strict';
import axios from 'axios';
import querystring from "querystring";

var instance = axios.create({
    baseURL: 'http://localhost:4000/',
    port:4000,
    headers:{
      "Content-Type":'multipart/form-data',
    }
});

export async function imageUpload(imageContent, currentUser) {
    const formData = new FormData();
    formData.append(
        'profile',
        imageContent,
        `profile_${currentUser.name}`
      );
    const resp = instance.post('/upload/image', formData, {withCredentials: true});
    return true;
};

