import { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider } from "firebase/auth";
import {auth,app} from '../../utilis/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/signin`, {
        email,
        password
      });

      dispatch(setUserData(response.data));
      // Assuming your backend returns a token or user data

      // Save token to localStorage (adjust based on your auth strategy)
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }

      // Redirect to dashboard or home
      navigate('/dashboard'); // or wherever you want
    } catch (err) {
      console.error('Sign-in error:', err);
      setError(
        err.response?.data?.message ||
        'Sign-in failed. Please check your email and password.'
      );
    } finally {
      setLoading(false);
    }
  };

 const handleGoogleSignIn = async () => {


  const provider = new GoogleAuthProvider();

  try {
    // 2. Trigger the Google Popup
    const result = await signInWithPopup(auth, provider);
    
    // 3. Prepare data to send to your backend
    // This combines the Google info with the mobile number from your form
    const userData = {
      email: result.user.email,
  
    };


    // 4. Send to your backend (similar to your handleSubmit logic)
    const {data} = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/google-auth`, userData,{withCredentials:true});
    navigate('/dashboard');
    dispatch(setUserData(data));
  } catch (error) {
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
        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back!</h2>
        <p className="text-slate-400 mb-6">Please enter your details to sign in.</p>

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-700 text-red-300 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-slate-300 mb-2 text-sm">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-slate-700 border-none text-white p-3 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
              placeholder="name@company.com"
            />
          </div>

          <div className="relative">
            <label className="block text-slate-300 mb-2 text-sm">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-slate-700 border-none text-white p-3 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none pr-10"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[42px] text-slate-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>


                {/* Forgot Password Link */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => navigate('/forget-password')}
              className="text-cyan-400 text-sm hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full font-bold py-3 rounded-lg transition-colors shadow-[0_0_20px_rgba(6,182,212,0.3)] ${
              loading
                ? 'bg-cyan-700 cursor-not-allowed'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-900'
            }`}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-slate-800 text-slate-400">Or continue with</span>
          </div>
        </div>

        {/* Google Sign In Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-slate-600 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.677-5.677C34.049,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.677-5.677C34.049,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,32.394,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
          </svg>
          <span className="font-medium text-slate-200">Sign in with Google</span>
        </button>

        <p className="text-center text-slate-400 mt-6 text-sm">
          Don’t have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-cyan-400 font-semibold hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;