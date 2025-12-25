import axios from 'axios';
import React, { useEffect } from 'react'

function useGetCurrentUser() {
   
useEffect(()=>{
     const fetchUser = async ()=>{

        try{
           
        const result= await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user/current`,{withCredentials:true});
        console.log("current user data", (result))
        }catch(err){
            console.log("error while fetching current user", err);
        }
      
     };
     fetchUser();
  
},[])

    

  
}

export default useGetCurrentUser