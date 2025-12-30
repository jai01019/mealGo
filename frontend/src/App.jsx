import React, { use } from 'react'
import {Navigate, Route,Routes} from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgetPassword from './pages/forgetPassword'
import useGetCurrentUser from './hooks/useGetCurrentUser'
import { useSelector } from 'react-redux'
import Home from './pages/home'
import useGetCity from "./hooks/useGetCity"
function App() {
useGetCurrentUser();
useGetCity()

const {userData} = useSelector((state) => state.user);
  return (
<>
  
    <Routes>
    <Route  path="/signup"  element={!userData ?<SignUp/> : <Navigate to="/" />}/>
    <Route  path="/signin"  element={userData ? <Navigate to='/' />: <SignIn/>}/>
   <Route path="/forget-password" element={ userData ? <Navigate to='/' />:  <ForgetPassword />} />
    <Route path="/" element={ !userData ? <Navigate to='/signin' />: <Home/>}/>
    </Routes>

    </>
  )
}
export default App