import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setCity } from '../redux/userSlice';

function useGetCity() {
    const dispatch = useDispatch();

// useEffect(()=>{
//      navigator.geolocation.getCurrentPosition( async (position)=>{
//        console.log("position in getCity:",position)
//        const latitude = position.coords.altitude;
//        const longitude = position.coords.longitude;
//        const result = await axios.get("https://api.geoapify.com/v1/geocode/reverse?lat=52.47944744483806&lon=13.213967739855434&format=json&apiKey=YOUR_API_KEY
   
// check which one have to used 
//         https://api.geoapify.com/v1/geocode/reverse?REQUEST_PARAMS


// ")


//      })
// },[])

// }  

  


export default useGetCity 
 
