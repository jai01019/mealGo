// import React from 'react'

// function UserDashboard() {
//   return (
//     <div>UserDashboard</div>
//   )
// }

// export default UserDashboard
/////////////////
import React, { useState, useEffect } from 'react';
import { Search, MapPin, ShoppingCart, Bell, LogOut, Package, X } from 'lucide-react';
import { useSelector } from 'react-redux';

const UserDashboard = () => {
  const { userData } = useSelector((state) => state.user);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Prevent body scroll when search is open
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSearchOpen]);

  const userInitial = userData?.fullName ? userData.fullName.charAt(0).toUpperCase() : 'U';

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans">
      
      {/* BLURRED MOBILE SEARCH OVERLAY */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-start pt-20 px-4 backdrop-blur-md bg-[#0f172a]/60 animate-in fade-in duration-300">
          {/* Close button at top right */}
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-6 right-6 p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors"
          >
            <X size={24} />
          </button>

          {/* Search Input Box */}
          <div className="w-full max-w-md bg-[#1e293b] border border-[#00d1ff]/50 rounded-2xl p-4 shadow-2xl scale-in-center">
            <div className="flex items-center gap-3">
              <Search className="text-[#00d1ff]" size={22} />
              <input 
                autoFocus
                type="text" 
                placeholder="Search for food, cakes, or snacks..." 
                className="bg-transparent border-none focus:outline-none w-full text-lg placeholder:text-slate-500"
              />
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-700">
              <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-3">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {['Pizza', 'Burger', 'Paneer', 'Biryani'].map(tag => (
                  <span key={tag} className="text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700 text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav className="bg-[#1e293b] border-b border-slate-700 px-4 md:px-8 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4 md:gap-8">
          <h1 className="text-2xl font-bold text-[#00d1ff] tracking-tight">Vingo</h1>
          
          {/* Desktop Search Bar */}
          <div className="hidden md:flex items-center bg-[#0f172a] border border-slate-600 rounded-lg px-4 py-2 w-80 lg:w-96">
            <div className="flex items-center gap-2 border-r border-slate-600 pr-3 text-gray-400">
              <MapPin size={18} className="text-[#00d1ff]" />
              <span className="text-sm">Jhansi</span>
            </div>
            <div className="flex items-center gap-2 pl-3 flex-1">
              <Search size={18} className="text-gray-400" />
              <input type="text" placeholder="Search delicious food..." className="bg-transparent border-none focus:outline-none text-sm w-full" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          {/* Mobile Search Icon */}
          <button onClick={() => setIsSearchOpen(true)} className="md:hidden p-2 text-gray-300">
            <Search size={24} />
          </button>

          <button className="relative text-gray-300 hover:text-[#00d1ff]">
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-[#00d1ff] text-[#0f172a] text-[10px] font-bold px-1.5 rounded-full">0</span>
          </button>
          
          {/* Profile Dropdown */}
          <div className="relative">
            <div 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 bg-[#334155] p-1 md:pr-3 md:pl-1 rounded-full cursor-pointer hover:bg-slate-600 transition-all"
            >
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#00d1ff] flex items-center justify-center text-[#0f172a] font-bold text-lg">
                {userInitial}
              </div>
              <span className="hidden md:block text-sm font-medium">Account</span>
            </div>

            {isProfileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
                <div className="absolute right-0 mt-3 w-64 bg-[#1e293b] border border-slate-700 rounded-2xl shadow-2xl z-50 py-2">
                  <div className="px-4 py-3 border-b border-slate-700">
                    <p className="text-sm text-gray-400">Signed in as</p>
                    <p className="font-bold truncate text-[#00d1ff]">{userData?.fullName || "Stuart Holder"}</p>
                    <p className="text-xs text-gray-500 truncate">{userData?.email}</p>
                  </div>
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl hover:bg-[#334155]">
                      <Package size={18} className="text-gray-400" />
                      My Orders
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl hover:bg-red-500/10 text-red-400 mt-1">
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content (Will be blurred when search is open) */}
      <main className={`p-6 md:p-8 max-w-7xl mx-auto transition-all duration-300 ${isSearchOpen ? 'blur-sm' : ''}`}>
        <header className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">
            Welcome back, <span className="text-[#00d1ff]">{userData?.fullName?.split(' ')[0] || "User"}!</span>
          </h2>
          <p className="text-gray-400 mt-2">Hungry? Explore the best food in Jhansi.</p>
        </header>

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