

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../utilis/firebase";
import { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL || 'http://localhost:8000'}/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      
      // DEBUG: Check the response structure
      console.log("=== SIGNIN RESPONSE ===");
      console.log("Full Response:", data);
      console.log("User object:", data.user);
      console.log("Role:", data.user?.role || data.role);
      console.log("======================");

      if (!response.ok) {
        throw new Error(data.message || 'Sign-in failed');
      }

      // Store user data - adjust based on your backend response structure
      // If backend returns { user: {...}, token: "..." }
      const userData = data.user || data;
      
      localStorage.setItem('user', JSON.stringify(userData));
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }

const role = data.user.role;

if (role === "user") window.location.href = "/";
else if (role === "owner") window.location.href = "/";
else if (role === "deliveryBoy") window.location.href = "/";

      
    } catch (err) {
      console.error('Sign-in error:', err);
      setError(err.message || 'Sign-in failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };


const handleGoogleSignIn = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const userData = {
      fullName: result.user.displayName,
      email: result.user.email,
      mobile: "0000000000", // or ask user later
      role: "user"
    };

    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/auth/google-auth`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(userData),
      }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Google login failed");

    // Redirect
    window.location.href = "/";
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    setError("Google sign-in failed");
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

          <div className="text-right">
            <button
              type="button"
              onClick={() => window.location.href = '/forget-password'}
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
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-slate-800 text-slate-400">Or continue with</span>
          </div>
        </div>

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
          Don't have an account?{' '}
          <button
            onClick={() => window.location.href = '/signup'}
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