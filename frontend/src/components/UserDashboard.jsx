import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';
import axios from 'axios';
import Navbar from './Navbar'; 
import { clearUser } from '../redux/userSlice'; // Update with your actual path

const UserDashboard = () => {
  const { userData } = useSelector((state) => state.user);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = isSearchOpen ? 'hidden' : 'unset';
  }, [isSearchOpen]);

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

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans">
      <Navbar 
        isSearchOpen={isSearchOpen} 
        setIsSearchOpen={setIsSearchOpen} 
        onLogout={handleLogout} 
      />

      <main className={`p-6 md:p-8 max-w-7xl mx-auto transition-all duration-300 ${isSearchOpen ? 'blur-sm scale-[0.98]' : 'blur-0 scale-100'}`}>
        <header className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">
            Welcome back, <span className="text-[#00d1ff]">{userData?.fullName?.split(' ')[0] || "User"}!</span>
          </h2>
          <p className="text-gray-400 mt-2">Hungry? Explore the best food in your city.</p>
        </header>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6 hover:border-[#00d1ff]/50 transition-all cursor-pointer group">
              <div className="w-12 h-12 bg-[#0f172a] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Bell className="text-[#00d1ff]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Order Tracking</h3>
              <p className="text-gray-400 text-sm">Update on your recent order #{item}09</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;