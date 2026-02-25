import React, { useState } from 'react';
import { Eye, EyeOff, UserPlus, Mail, Lock, Phone, UserCircle } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider } from "firebase/auth";
import {auth} from '../../utilis/firebase';
import { signInWithPopup } from 'firebase/auth';
import { setUserData } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
const SignUp = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '', 
    email: '', 
    password: '', 
    mobile: '', 
    role: 'user'
  });
  const [error,setError]=useState('');
  const [loading, setLoading] = useState(false); // Optional: show loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Make sure your .env has VITE_SERVER_URL=http://localhost:8000
     const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/signup`, formData,{withCredentials:true});


const userData = response.data.user || response.data;
dispatch(setUserData(userData));

// navigate('/dashboard');

      // If signup succeeds (e.g., 201 Created), you can redirect
dispatch(setUserData(response.data.user));

    
      navigate('/'); // or '/dashboard' if auto-login
    } catch (error) {
      console.error('Signup error:', error);
      setError(
        error.response?.data?.message || "Signup failed please try again."
      )
      // Optional: show error message to user (e.g., email already exists)
      alert( 
        error.response?.data?.message || 
        'Signup failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

const handleGoogleSignUp = async () => {
  // 1. Check if the mobile number exists in your state
  if (!formData.mobile) {
    setError(
        error.response?.data?.message || "Mobile number is required for sign up with Google. please enter first ."
      )
    return; // Stop execution if mobile is missing
  }

  const provider = new GoogleAuthProvider();

  try {
    // 2. Trigger the Google Popup
    const result = await signInWithPopup(auth, provider);
    
    // 3. Prepare data to send to your backend
    // This combines the Google info with the mobile number from your form
    const userData = {
      fullName: result.user.displayName,
      email: result.user.email,
      mobile: formData.mobile,
      role: formData.role,
      googleId: result.user.uid
    };



    // 4. Send to your backend (similar to your handleSubmit logic)
    const {data} = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/google-auth`, userData,{withCredentials:true});
    dispatch(setUserData(data.user));
    navigate('/');
  } catch (error) { 
    setError(
        error.response?.data?.message || "An error occurred during Google Sign-In."
      )
    console.error("Google Sign-Up Error:", error);
    if (error.code === 'auth/popup-closed-by-user') {
      alert("Sign-in cancelled.");
    } else {
      alert("An error occurred during Google Sign-In.");
    }
  }
};
return (
  <div className="min-h-screen flex items-center justify-center bg-slate-900 p-6">
    <div className="bg-slate-800 p-8 rounded-3xl shadow-2xl w-full max-w-md border border-slate-700">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">
          Create Account
        </h2>
        <p className="text-slate-400">
          Please fill in your details to sign up.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-700 text-red-300 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Full Name */}
        <div>
          <label className="block text-slate-300 mb-2 text-sm">
            Full Name
          </label>
          <input
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="John Doe"
            className="w-full bg-slate-700 border-none text-white p-3 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-slate-300 mb-2 text-sm">
            Email Address
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="name@company.com"
            className="w-full bg-slate-700 border-none text-white p-3 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <label className="block text-slate-300 mb-2 text-sm">
            Password
          </label>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
            className="w-full bg-slate-700 border-none text-white p-3 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none pr-10"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[42px] text-slate-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Mobile */}
        <div>
          <label className="block text-slate-300 mb-2 text-sm">
            Mobile Number
          </label>
          <input
            name="mobile"
            type="text"
            value={formData.mobile}
            onChange={handleChange}
            required
            placeholder="9876543210"
            className="w-full bg-slate-700 border-none text-white p-3 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-slate-300 mb-2 text-sm">
            Select Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full bg-slate-700 border-none text-white p-3 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
          >
            <option value="user">Standard User</option>
            <option value="owner">Business Owner</option>
            <option value="deliveryBoy">Delivery Partner</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full font-bold py-3 rounded-lg transition-colors shadow-[0_0_20px_rgba(6,182,212,0.3)] ${
            loading
              ? "bg-cyan-700 cursor-not-allowed"
              : "bg-cyan-500 hover:bg-cyan-400 text-slate-900"
          }`}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-slate-800 text-slate-400">
            Or continue with
          </span>
        </div>
      </div>

      {/* Google Button */}
      <button
        type="button"
        onClick={handleGoogleSignUp}
        className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-slate-600 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
      >
       <svg width="20" height="20" viewBox="0 0 48 48">
  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.677-5.677C34.049,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.677-5.677C34.049,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C36.971,39.205,44,32.394,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
</svg>

        <span className="font-medium text-slate-200">
          Sign up with Google
        </span>
      </button>

      {/* Footer */}
      <p className="text-center text-slate-400 mt-6 text-sm">
        Already have an account?{" "}
        <button
          onClick={() => navigate("/signin")}
          className="text-cyan-400 font-semibold hover:underline"
        >
          Sign in
        </button>
      </p>

    </div>
  </div>
);



};

export default SignUp;