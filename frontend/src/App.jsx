import React from 'react'
import {Route,Routes} from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgetPassword from './pages/forgetPassword'
function App() {

  return (
    <Routes>
    <Route  path="/signup"  element={<SignUp/>}/>
    <Route  path="/signin"  element={<SignIn/>}/>
   <Route path="/forget-password" element={<ForgetPassword />} />
    </Routes>
  )
}
export default App