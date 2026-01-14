import React from 'react'
import UserDashboard from '../components/UserDashboard';
import { useSelector } from 'react-redux';
import OwnerDashboard from '../components/OwnerDashboard';
import DeliveryDashboard from '../components/DeliveryDashboard';
function Home() {
    const {userData} = useSelector((state) => state.user);
      if (!userData) return null; // or loader
  return (
    <>
  {userData.role ==="user" && <UserDashboard/>}  
  {userData.role ==="owner" && <OwnerDashboard/>}  
  {userData.role ==="deliveryBoy" && <DeliveryDashboard/>}  

    </>
  )
}

export default Home
