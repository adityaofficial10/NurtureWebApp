/* eslint-disable no-undef */
import './App.css';
import { getSlotsForMentor } from './helpers/mentors';
import React from 'react';

 function App() {
  

  let [responseData,setResponseData] = React.useState('');
  //let [token,setToken] = React.useState('');
  const fetchData = (e) => {
    e.preventDefault()
    getSlotsForMentor().then((response)=>{
        setResponseData(response);
        console.log(response);
    })
    .catch((error) => {
        throw new Error('Error fetching mentors...'+ error);
    })
}
      return (
        <div>
        <button onClick = {(e)=>fetchData(e)} type ="button">Click for Data</button>
        </div>
      );
}



export default App;
