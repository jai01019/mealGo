import React, { useState } from 'react';
import { Search, MapPin, ShoppingCart, LogOut, Package, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { FaPlus } from "react-icons/fa";
import { TbReceipt2 } from "react-icons/tb";

const Navbar = ({ isSearchOpen, setIsSearchOpen, onLogout }) => {
  const { userData, city } = useSelector((state) => state.user);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const userInitial = userData?.fullName ? userData.fullName.charAt(0).toUpperCase() : 'U';

  return (
    <>
      {/* BLURRED MOBILE SEARCH OVERLAY */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-start pt-20 px-4 backdrop-blur-md bg-[#0f172a]/60 animate-in fade-in duration-300 ">
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-6 right-6 p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors"
          >
            <X size={24} />
          </button>

          <div className="w-full max-w-md bg-[#1e293b] border border-[#00d1ff]/50 rounded-2xl p-4 shadow-2xl scale-in-center">
            <div className="flex items-center gap-3">
              <Search className="text-[#00d1ff]" size={22} />
              <input 
                autoFocus
                type="text" 
                placeholder="Search for food, cakes, or snacks..." 
                className="bg-transparent border-none focus:outline-none w-full text-lg placeholder:text-slate-500 text-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav className="bg-[#1e293b] border-b border-slate-700 px-4 md:px-8 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4 md:gap-8">
          <h1 className="text-2xl font-bold text-[#00d1ff] tracking-tight cursor-pointer">Vingo</h1>
          
        {userData.role=="user" && (  <div className="hidden md:flex items-center bg-[#0f172a] border border-slate-600 rounded-lg px-4 py-2 w-80 lg:w-96">
            <div className="flex items-center gap-2 border-r border-slate-600 pr-3 text-gray-400">
              <MapPin size={18} className="text-[#00d1ff]" />
              <span className="text-sm">{city || "loading..."}</span>
            </div>


            <div className="flex items-center gap-2 pl-3 flex-1">
              <Search size={18} className="text-gray-400" />
              <input type="text" placeholder="Search delicious food..." className="bg-transparent border-none focus:outline-none text-sm w-full text-white" />

            </div>

          </div>
        )}


        </div> 

       
           
        <div className="flex items-center gap-3 md:gap-6">

         {userData.role == "owner" && (
          <>
 <button className='flex items-center justify-center p-2 rounded-full bg-[#ff4d2d]/10 text-[#eaede1] 
  sm:gap-2 sm:px-4'> 
  <FaPlus size={25} />
  <span className='hidden sm:block'>Add Food Item</span>
</button>

<div className='flex items-center gap-2 cursor-pointer relative p-2 rounded-full bg-[#ff4d2d]/10 text-[#eaede1] font-medium'>

  <div className="relative">
    <TbReceipt2 size={25}/>
    
    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ff4d2d] text-[10px] text-white">
      5
    </span>
  </div>

  <span className='hidden sm:block'>My Orders</span>
</div>


  </>
)}
          {userData.role =='user' &&(
          <button onClick={() => setIsSearchOpen(true)} className="md:hidden p-2 text-gray-300">
            <Search size={24} />
          </button>
          )}


        
        
        {userData.role =='user' && (
          <button className="relative text-gray-300 hover:text-[#00d1ff]">
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-[#00d1ff] text-[#0f172a] text-[10px] font-bold px-1.5 rounded-full">0</span>
          </button>
        )}
          <div className="relative">
            <div 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 bg-[#334155] p-1 md:pr-3 md:pl-1 rounded-full cursor-pointer hover:bg-slate-600 transition-all"
            >
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#00d1ff] flex items-center justify-center text-[#0f172a] font-bold text-lg">
                {userInitial}
              </div>
              <span className="hidden md:block text-sm font-medium text-white">Account</span>
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

                    <>
                    {userData.role =="user" && (
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl hover:bg-[#334155] text-white">
                      <Package size={18} className="text-gray-400" />
                      My Orders
                    </button>
                    )}
                    <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl hover:bg-red-500/10 text-red-400 mt-1">
                      <LogOut size={18} />
                      Logout
                    </button>
                    </>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;