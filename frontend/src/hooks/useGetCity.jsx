import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setCity } from '../redux/userSlice';
import { useSelector } from 'react-redux';
function useGetCity() {
    const dispatch = useDispatch();
    const apiKey = import.meta.env.VITE_GEOAPIKEY;
    const {userData} = useSelector((state)=>state.user);

useEffect(()=>{
     navigator.geolocation.getCurrentPosition( async (position)=>{
       const latitude = position.coords.latitude;
       const longitude = position.coords.longitude;
       const result = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`);
        const city = result.data.results[0].city
        dispatch(setCity(city));
    });
}, [userData, apiKey, dispatch]);
}  





export default useGetCity 
 
