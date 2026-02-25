
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { Bell, MapPin, Star, Utensils } from 'lucide-react';
// import axios from 'axios';
// import Navbar from './Navbar'; 
// import CategoryCard from './CategoryCard';
// import { categories } from '../category';
// import { clearUser } from '../redux/userSlice';
// import useGetShopsByCity from '../hooks/useGetShopsByCity';

// // 🔹 ShopCard Sub-component (can be moved to separate file)
// const ShopCard = ({ shop }) => {
//   return (
//     <div className="bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden hover:border-[#00d1ff]/50 transition-all duration-300 cursor-pointer group hover:scale-[1.02] hover:shadow-lg hover:shadow-[#00d1ff]/10">
//       {/* Shop Image */}
//       <div className="relative h-40 overflow-hidden">
//         <img
//           src={shop.image || "https://via.placeholder.com/400x200?text=No+Image"}
//           alt={shop.name}
//           className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//           loading="lazy"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-70" />
        
//         {/* Food Type Badge */}
//         {shop.items?.length > 0 && (
//           <div className="absolute top-3 right-3 bg-[#00d1ff] text-[#0f172a] text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
//             <Utensils size={12} />
//             {shop.items.filter(i => i.foodType === 'veg').length} Veg • {shop.items.filter(i => i.foodType === 'non veg').length} Non-Veg
//           </div>
//         )}
//       </div>

//       {/* Shop Details */}
//       <div className="p-4">
//         <div className="flex justify-between items-start mb-2">
//           <h3 className="text-lg font-semibold text-white group-hover:text-[#00d1ff] transition-colors line-clamp-1">
//             {shop.name}
//           </h3>
//           <div className="flex items-center gap-1 text-yellow-400 text-sm">
//             <Star size={14} fill="currentColor" />
//             <span>4.2</span>
//           </div>
//         </div>
        
//         <div className="flex items-center gap-1 text-gray-400 text-sm mb-3">
//           <MapPin size={14} />
//           <span className="line-clamp-1">{shop.address}, {shop.city}</span>
//         </div>
        
//         <div className="flex items-center justify-between">
//           <span className="text-xs text-gray-500">
//             {shop.items?.length || 0} items available
//           </span>
//           <button className="text-xs bg-[#00d1ff]/10 text-[#00d1ff] px-3 py-1.5 rounded-full hover:bg-[#00d1ff]/20 transition-colors">
//             View Menu
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const UserDashboard = () => {
//   const { userData, city: userCity } = useSelector((state) => state.user);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   // 🔹 Fetch shops for current city using custom hook
//   const { shops, isLoading: shopsLoading, error: shopsError, refetch: refetchShops } = useGetShopsByCity();

//   useEffect(() => {
//     document.body.style.overflow = isSearchOpen ? 'hidden' : 'unset';
//   }, [isSearchOpen]);

//   const handleLogout = async () => {
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_SERVER_URL}/api/auth/signout`,
//         { withCredentials: true }
//       );
//       if (response.data.success) {
      
//         dispatch(clearUser()); 
//         navigate('/signin'); 
//       }
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0f172a] text-white font-sans">
//       <Navbar 
//         isSearchOpen={isSearchOpen} 
//         setIsSearchOpen={setIsSearchOpen} 
//         onLogout={handleLogout} 
//       />
//       <main className={`p-6 md:p-8 max-w-7xl mx-auto transition-all duration-300 ${isSearchOpen ? 'blur-sm scale-[0.98]' : 'blur-0 scale-100'}`}>
        
//         {/* Header */}
//         <header className="mb-8">
//           <h2 className="text-2xl md:text-3xl font-bold">
//             Welcome back, <span className="text-[#00d1ff]">{userData?.fullName?.split(' ')[0] || "User"}!</span>
//           </h2>
//           <p className="text-gray-400 mt-2">Hungry? Explore the best food in your city.</p>
//         </header>

//         {/* Categories Section */}
//         <section className="mb-10">
//           <CategoryCard categories={categories} />
//         </section>

//         {/* 🔹 Best Shops Section */}
//         <section className="mb-12">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl md:text-2xl font-bold">
//               Best Shops in <span className="text-[#00d1ff]">{userCity || "Your City"}</span>
//             </h2>
//             {/* {shops?.length > 0 && (
//               <button 
//                 onClick={refetchShops}
//                 className="text-sm text-[#00d1ff] hover:underline flex items-center gap-1"
//               >
//                 ↻ Refresh
//               </button>
//             )} */}
//           </div>

//           {/* Loading State */}
//           {shopsLoading && (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//               {[1, 2, 3, 4].map((i) => (
//                 <div key={i} className="bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden animate-pulse">
//                   <div className="h-40 bg-slate-700" />
//                   <div className="p-4 space-y-3">
//                     <div className="h-5 bg-slate-700 rounded w-3/4" />
//                     <div className="h-4 bg-slate-700 rounded w-full" />
//                     <div className="h-4 bg-slate-700 rounded w-1/2" />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Error State */}
//           {shopsError && !shopsLoading && (
//             <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center">
//               <p className="text-red-400">⚠️ {shopsError}</p>
//               <button 
//                 onClick={refetchShops}
//                 className="mt-2 text-sm text-[#00d1ff] hover:underline"
//               >
//                 Try Again
//               </button>
//             </div>
//           )}

//           {/* Empty State */}
//           {!shopsLoading && !shopsError && shops?.length === 0 && (
//             <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-8 text-center">
//               <Utensils className="mx-auto text-gray-500 mb-3" size={48} />
//               <p className="text-gray-400">No shops found in {userCity}</p>
//               <p className="text-sm text-gray-500 mt-1">Try exploring other categories above!</p>
//             </div>
//           )}

//           {/* Shops Grid */}
//           {!shopsLoading && !shopsError && shops?.length > 0 && (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//               {shops.map((shop) => (
//                 <ShopCard key={shop._id} shop={shop} />
//               ))}
//             </div>
//           )}
//         </section>

//         {/* Dashboard Cards (Order Tracking, etc.) */}
//         <section>
//           <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[1, 2, 3].map((item) => (
//               <div key={item} className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6 hover:border-[#00d1ff]/50 transition-all cursor-pointer group">
//                 <div className="w-12 h-12 bg-[#0f172a] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
//                   <Bell className="text-[#00d1ff]" />
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">Order Tracking</h3>
//                 <p className="text-gray-400 text-sm">Update on your recent order #{item}09</p>
//               </div>
//             ))}
//           </div>
//         </section>

//       </main>
//     </div>
//   );
// };

// export default UserDashboard;


import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Bell, MapPin, Star, Utensils, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import Navbar from './Navbar';
import CategoryCard from './CategoryCard';
import { categories } from '../category';
import { clearUser } from '../redux/userSlice';
import useGetShopsByCity from '../hooks/useGetShopsByCity';

// 🔹 ShopCard Sub-component
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
            {shop.items.filter(i => i.foodType === 'veg').length} Veg •{' '}
            {shop.items.filter(i => i.foodType === 'non veg').length} Non-Veg
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

// 🔹 ShopCarousel — same sliding logic as CategoryCard
const ShopCarousel = ({ shops, userCity }) => {
  const scrollRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);

      const cardWidth = isMobile ? clientWidth * 0.8 : clientWidth * 0.26;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(index, shops.length - 1));
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = isMobile
        ? scrollRef.current.clientWidth * 0.8
        : 300;
      const newScrollLeft =
        direction === 'left'
          ? scrollRef.current.scrollLeft - scrollAmount
          : scrollRef.current.scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  const scrollToIndex = (index) => {
    if (scrollRef.current) {
      const cardWidth = isMobile
        ? scrollRef.current.clientWidth * 0.8
        : scrollRef.current.clientWidth * 0.26;
      scrollRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="text-xl md:text-2xl font-bold">
          Best Shops in <span className="text-[#00d1ff]">{userCity || 'Your City'}</span>
        </h2>
        {isMobile && showRightButton && (
          <span className="text-sm text-gray-400">Swipe →</span>
        )}
      </div>

      {/* Left Arrow — Desktop Only */}
      {!isMobile && showLeftButton && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#00d1ff] hover:bg-[#00b8e6] text-[#0f172a] p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Scrollable Cards */}
      <div
        ref={scrollRef}
        onScroll={checkScrollPosition}
        className="flex gap-4 overflow-x-auto scroll-smooth px-2"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: isMobile ? 'x mandatory' : 'none',
        }}
      >
        {shops.map((shop) => (
          <div
            key={shop._id}
            className="flex-shrink-0"
            style={{
              width: isMobile ? '80%' : 'calc(25% - 12px)',
              scrollSnapAlign: isMobile ? 'start' : 'none',
            }}
          >
            <ShopCard shop={shop} />
          </div>
        ))}
      </div>

      {/* Right Arrow — Desktop Only */}
      {!isMobile && showRightButton && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#00d1ff] hover:bg-[#00b8e6] text-[#0f172a] p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Scroll right"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Pagination Dots — Mobile Only */}
      {isMobile && (
        <div className="flex justify-center gap-2 mt-4">
          {shops.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === activeIndex
                  ? 'w-8 h-2 bg-[#00d1ff]'
                  : 'w-2 h-2 bg-slate-600 hover:bg-slate-500'
              }`}
              aria-label={`Go to shop ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar — Mobile Only */}
      {isMobile && (
        <div className="mt-3 h-1 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#00d1ff] transition-all duration-300"
            style={{ width: `${((activeIndex + 1) / shops.length) * 100}%` }}
          />
        </div>
      )}
    </div>
  );
};

// 🔹 Skeleton loader that matches carousel layout
const ShopCarouselSkeleton = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div className="flex gap-4 overflow-hidden px-2">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="flex-shrink-0 bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden animate-pulse"
          style={{ width: isMobile ? '80%' : 'calc(25% - 12px)' }}
        >
          <div className="h-40 bg-slate-700" />
          <div className="p-4 space-y-3">
            <div className="h-5 bg-slate-700 rounded w-3/4" />
            <div className="h-4 bg-slate-700 rounded w-full" />
            <div className="h-4 bg-slate-700 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};

const UserDashboard = () => {
  const { userData, city: userCity } = useSelector((state) => state.user);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    shops,
    isLoading: shopsLoading,
    error: shopsError,
    refetch: refetchShops,
  } = useGetShopsByCity();

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
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans">
      <Navbar
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        onLogout={handleLogout}
      />
      <main
        className={`p-6 md:p-8 max-w-7xl mx-auto transition-all duration-300 ${
          isSearchOpen ? 'blur-sm scale-[0.98]' : 'blur-0 scale-100'
        }`}
      >
        {/* Header */}
        <header className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">
            Welcome back,{' '}
            <span className="text-[#00d1ff]">
              {userData?.fullName?.split(' ')[0] || 'User'}!
            </span>
          </h2>
          <p className="text-gray-400 mt-2">
            Hungry? Explore the best food in your city.
          </p>
        </header>

        {/* Categories Section */}
        <section className="mb-10">
          <CategoryCard categories={categories} />
        </section>

        {/* 🔹 Best Shops Carousel Section */}
        <section className="mb-12">
          {/* Loading State */}
          {shopsLoading && (
            <>
              <div className="mb-4 px-2">
                <h2 className="text-xl md:text-2xl font-bold">
                  Best Shops in{' '}
                  <span className="text-[#00d1ff]">{userCity || 'Your City'}</span>
                </h2>
              </div>
              <ShopCarouselSkeleton />
            </>
          )}

          {/* Error State */}
          {shopsError && !shopsLoading && (
            <>
              <div className="mb-4 px-2">
                <h2 className="text-xl md:text-2xl font-bold">
                  Best Shops in{' '}
                  <span className="text-[#00d1ff]">{userCity || 'Your City'}</span>
                </h2>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center">
                <p className="text-red-400">⚠️ {shopsError}</p>
                <button
                  onClick={refetchShops}
                  className="mt-2 text-sm text-[#00d1ff] hover:underline"
                >
                  Try Again
                </button>
              </div>
            </>
          )}

          {/* Empty State */}
          {!shopsLoading && !shopsError && shops?.length === 0 && (
            <>
              <div className="mb-4 px-2">
                <h2 className="text-xl md:text-2xl font-bold">
                  Best Shops in{' '}
                  <span className="text-[#00d1ff]">{userCity || 'Your City'}</span>
                </h2>
              </div>
              <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-8 text-center">
                <Utensils className="mx-auto text-gray-500 mb-3" size={48} />
                <p className="text-gray-400">No shops found in {userCity}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Try exploring other categories above!
                </p>
              </div>
            </>
          )}

          {/* ✅ Carousel — shown when shops exist */}
          {!shopsLoading && !shopsError && shops?.length > 0 && (
            <ShopCarousel shops={shops} userCity={userCity} />
          )}
        </section>

        {/* Quick Actions */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6 hover:border-[#00d1ff]/50 transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 bg-[#0f172a] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Bell className="text-[#00d1ff]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Order Tracking</h3>
                <p className="text-gray-400 text-sm">
                  Update on your recent order #{item}09
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserDashboard;