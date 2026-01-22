import React from 'react'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';
import axios from 'axios';
import Navbar from './Navbar';  
import { clearUser } from '../redux/userSlice'; // Update with your actual path
import { Utensils, ChefHat, Users, TrendingUp, ArrowRight } from 'lucide-react';function OwnerDashboard() {

  const [isSearchOpen, setIsSearchOpen] = useState(false);

   const { myShopData } = useSelector((state) => state.owner);


  const dispatch = useDispatch();
  const navigate = useNavigate();   
    const handleLogout = async () => {  
      try {
        // Use GET to match your backend: authRouter.get("/signout", signOut)
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/auth/signout`,
          { withCredentials: true }
        );
  
        if (response.data.success) {
          console.log("Logged out successfully");
  
          // 1. Clear Redux State so Protected Routes know the user is gone
          dispatch(clearUser()); 
  
          // 2. Navigate to Sign In page immediately
          navigate('/signin'); 
        }
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };
  
 const handleNavigate = () => {
    navigate('/create-edit-shop')
  };

return (
      <>
        <div className=" min-h-screen bg-[#0f172a] text-white font-sans flex flex-col">
          <Navbar 
            isSearchOpen={isSearchOpen} 
            setIsSearchOpen={setIsSearchOpen} 
            onLogout={handleLogout} 
          />  
    
     {!myShopData && ( 
<div className="min-h-screen bg-[#0f172a] text-white font-sans flex items-center justify-center p-4">
      <div className="flex justify-center w-full max-w-6xl">
        {/* Enhanced Card with Gradient Background */}
        <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 shadow-2xl max-w-2xl w-full border border-slate-700/50 overflow-hidden">
          
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#ff4d24]/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-3xl"></div>
          
          {/* Content */}
          <div className="relative z-10">
            {/* Icon with animated gradient background */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff4d24] to-[#ff6b47] rounded-3xl blur-xl opacity-50 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-[#ff4d24] to-[#ff6b47] p-6 rounded-3xl shadow-lg">
                  <Utensils 
                    size={56} 
                    strokeWidth={2.5} 
                    className="text-white" 
                  />
                </div>
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-white text-3xl sm:text-4xl font-bold mb-4 text-center">
              Launch Your Restaurant
            </h2>
            
            {/* Subheading */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 text-center max-w-lg mx-auto">
              Join our food delivery platform and reach thousands of hungry customers every day. Start growing your business today!
            </p>

            {/* Feature Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 border border-slate-700/50">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Reach</p>
                  <p className="text-sm font-semibold text-white">1000+ Users</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 border border-slate-700/50">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Growth</p>
                  <p className="text-sm font-semibold text-white">Fast Setup</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 border border-slate-700/50">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <ChefHat className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Quality</p>
                  <p className="text-sm font-semibold text-white">Top Rated</p>
                </div>
              </div>
            </div>

            {/* CTA Button with enhanced design */}
            <button 
              onClick={handleNavigate}
              className="group relative w-full bg-gradient-to-r from-[#ff4d24] to-[#ff6b47] hover:from-[#ff6b47] hover:to-[#ff4d24] text-white font-bold py-4 px-12 rounded-2xl transition-all duration-300 active:scale-95 shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative flex items-center justify-center gap-2 text-lg">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            {/* Footer note */}
            <p className="text-center text-slate-500 text-sm mt-6">
              Free to join • No hidden fees • Start earning today
            </p>
          </div>
        </div>
      </div>
    </div>
 )} 
 </div>
</>
 )
    
}

export default OwnerDashboard