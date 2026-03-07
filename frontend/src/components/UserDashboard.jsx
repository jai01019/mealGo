
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Bell, MapPin, Star, Utensils } from 'lucide-react';
import axios from 'axios';
import Navbar from './Navbar'; 
import CategoryCard from './CategoryCard';
import { categories } from '../category';
import { clearUser } from '../redux/userSlice';
import useGetShopsByCity from '../hooks/useGetShopsByCity';

// 🔹 ShopCard Sub-component (can be moved to separate file)
const ShopCard = ({ shop }) => {
  return (
    <div className="bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden hover:border-[#00d1ff]/50 transition-all duration-300 cursor-pointer group hover:scale-[1.02] hover:shadow-lg hover:shadow-[#00d1ff]/10">
      {/* Shop Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={shop.image || "https://via.placeholder.com/400x200?text=No+Image"}
          alt={shop.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-70" />
        
        {/* Food Type Badge */}
        {shop.items?.length > 0 && (
          <div className="absolute top-3 right-3 bg-[#00d1ff] text-[#0f172a] text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
            <Utensils size={12} />
            {shop.items.filter(i => i.foodType === 'veg').length} Veg • {shop.items.filter(i => i.foodType === 'non veg').length} Non-Veg
          </div>
        )}
      </div>

      {/* Shop Details */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-white group-hover:text-[#00d1ff] transition-colors line-clamp-1">
            {shop.name}
          </h3>
          <div className="flex items-center gap-1 text-yellow-400 text-sm">
            <Star size={14} fill="currentColor" />
            <span>4.2</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-gray-400 text-sm mb-3">
          <MapPin size={14} />
          <span className="line-clamp-1">{shop.address}, {shop.city}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {shop.items?.length || 0} items available
          </span>
          <button className="text-xs bg-[#00d1ff]/10 text-[#00d1ff] px-3 py-1.5 rounded-full hover:bg-[#00d1ff]/20 transition-colors">
            View Menu
          </button>
        </div>
      </div>
    </div>
  );
};

const UserDashboard = () => {
  const { userData, city: userCity } = useSelector((state) => state.user);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // 🔹 Fetch shops for current city using custom hook
  const { shops, isLoading: shopsLoading, error: shopsError, refetch: refetchShops } = useGetShopsByCity();

  useEffect(() => {
    document.body.style.overflow = isSearchOpen ? 'hidden' : 'unset';
  }, [isSearchOpen]);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/signout`,
        { withCredentials: true }
      );
      if (response.data.success) {
      
        dispatch(clearUser()); 
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
        
        {/* Header */}
        <header className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">
            Welcome back, <span className="text-[#00d1ff]">{userData?.fullName?.split(' ')[0] || "User"}!</span>
          </h2>
          <p className="text-gray-400 mt-2">Hungry? Explore the best food in your city.</p>
        </header>

        {/* Categories Section */}
        <section className="mb-10">
          <CategoryCard categories={categories} />
        </section>

        {/* 🔹 Best Shops Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold">
              Best Shops in <span className="text-[#00d1ff]">{userCity || "Your City"}</span>
            </h2>
            {/* {shops?.length > 0 && (
              <button 
                onClick={refetchShops}
                className="text-sm text-[#00d1ff] hover:underline flex items-center gap-1"
              >
                ↻ Refresh
              </button>
            )} */}
          </div>

          {/* Loading State */}
          {shopsLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-40 bg-slate-700" />
                  <div className="p-4 space-y-3">
                    <div className="h-5 bg-slate-700 rounded w-3/4" />
                    <div className="h-4 bg-slate-700 rounded w-full" />
                    <div className="h-4 bg-slate-700 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {shopsError && !shopsLoading && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center">
              <p className="text-red-400">⚠️ {shopsError}</p>
              <button 
                onClick={refetchShops}
                className="mt-2 text-sm text-[#00d1ff] hover:underline"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!shopsLoading && !shopsError && shops?.length === 0 && (
            <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-8 text-center">
              <Utensils className="mx-auto text-gray-500 mb-3" size={48} />
              <p className="text-gray-400">No shops found in {userCity}</p>
              <p className="text-sm text-gray-500 mt-1">Try exploring other categories above!</p>
            </div>
          )}

          {/* Shops Grid */}
          {!shopsLoading && !shopsError && shops?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {shops.map((shop) => (
                <ShopCard key={shop._id} shop={shop} />
              ))}
            </div>
          )}
        </section>

        {/* Dashboard Cards (Order Tracking, etc.) */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
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
        </section>

      </main>
    </div>
  );
};

export default UserDashboard;