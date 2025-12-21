import React, { useState } from 'react';
import { Eye, EyeOff, UserPlus, Mail, Lock, Phone, UserCircle } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider } from "firebase/auth";
import {auth,app} from '../../utilis/firebase';
import { signInWithPopup } from 'firebase/auth';
const SignUp = () => {
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
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/signup`, formData);

      // If signup succeeds (e.g., 201 Created), you can redirect
      console.log('Signup successful:', response.data);
      navigate('/signin'); // or '/dashboard' if auto-login
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

    console.log("User Data for Backend:", userData);

    // 4. Send to your backend (similar to your handleSubmit logic)
    const {data} = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/google-auth`, userData,{withCredentials:true});
    navigate('/dashboard');
console.log(data)
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
        <div className="text-center mb-6">
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="text-indigo-600" size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800">Create Account</h2>
          <p className="text-gray-500 mt-2">Join our community today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div className="relative">
            <UserCircle className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              name="fullName"
              type="text"
              placeholder="Full Name"
              onChange={handleChange}
              value={formData.fullName}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              onChange={handleChange}
              value={formData.email}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
              required
              className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-indigo-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Mobile */}
          <div className="relative">
            <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              name="mobile"
              type="text"
              placeholder="Mobile Number"
              onChange={handleChange}
              value={formData.mobile} 
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600 ml-1">Select Your Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white transition-all"
            >
              <option value="user">Standard User</option>
              <option value="owner">Business Owner</option>
              <option value="deliveryBoy">Delivery Partner</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full font-bold py-3 rounded-xl shadow-lg transition-opacity transform active:scale-95 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90'
            }`}
          >
            {loading ? 'Creating Account...' : 'Get Started'}
          </button>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm bg-white/95 px-2">
            <span className="text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Google Button */}
        <button
          type="button"
          onClick={handleGoogleSignUp}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white hover:bg-gray-50 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.677-5.677C34.049,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.677-5.677C34.049,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,32.394,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
          </svg>
          <span className="font-medium text-gray-700">Sign up with Google</span>
        </button>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/signin')}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;