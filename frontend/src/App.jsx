import React, { use } from 'react'
import {Navigate, Route,Routes} from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import CreateEditShop from './pages/CreateEditShop'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgetPassword from './pages/forgetPassword'
import useGetCurrentUser from './hooks/useGetCurrentUser'
import { useSelector } from 'react-redux'
import Home from './pages/home'
import useGetCity from "./hooks/useGetCity"
import useGetMyShop from "./hooks/useGetMyShop"
function App() {
useGetCurrentUser();
useGetCity()
useGetMyShop();

const { userData, loading } = useSelector((state) => state.user); 
  if (loading) {
    return <div>Checking login...</div>;
  } 
return (
<>
  <Toaster position="top-right" />
  
    <Routes>
    <Route  path="/signup"  element={!userData ?<SignUp/> : <Navigate to="/" />}/>
    <Route  path="/signin"  element={userData ? <Navigate to='/' />: <SignIn/>}/>
   <Route path="/forget-password" element={ userData ? <Navigate to='/' />:  <ForgetPassword />} />
    <Route path="/" element={ !userData ? <Navigate to='/signin' />: <Home/>}/>
    <Route path='/create-edit-shop' element={userData ? <CreateEditShop/> : <Navigate to='/signin' />}/>
    </Routes>

    </>
  )
}
export default App