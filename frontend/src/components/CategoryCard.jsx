// import React, { useRef, useState } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// function CategoryCard({ categories }) {
//   const scrollRef = useRef(null);
//   const [showLeftButton, setShowLeftButton] = useState(false);
//   const [showRightButton, setShowRightButton] = useState(true);

//   const checkScrollPosition = () => {
//     if (scrollRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
//       setShowLeftButton(scrollLeft > 0);
//       setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
//     }
//   };

//   const scroll = (direction) => {
//     if (scrollRef.current) {
//       const scrollAmount = 300;
//       const newScrollLeft = direction === 'left' 
//         ? scrollRef.current.scrollLeft - scrollAmount
//         : scrollRef.current.scrollLeft + scrollAmount;
      
//       scrollRef.current.scrollTo({
//         left: newScrollLeft,
//         behavior: 'smooth'
//       });
//     }
//   };

//   const handleScroll = () => {
//     checkScrollPosition();
//   };

//   return (
//     <div className="relative w-full mb-8">
//       {/* Left Scroll Button */}
//       {showLeftButton && (
//         <button
//           onClick={() => scroll('left')}
//           className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#00d1ff] hover:bg-[#00b8e6] text-[#0f172a] p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
//           aria-label="Scroll left"
//         >
//           <ChevronLeft size={24} />
//         </button>
//       )}

//       {/* Categories Container */}
//       <div
//         ref={scrollRef}
//         onScroll={handleScroll}
//         className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-2"
//         style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//       >
//         {categories.map((item, index) => (
//           <div
//             key={index}
//             className="flex-shrink-0 w-40 md:w-48 bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden hover:border-[#00d1ff]/50 transition-all duration-300 cursor-pointer group hover:scale-105 hover:shadow-lg hover:shadow-[#00d1ff]/20"
//           >
//             <div className="relative h-32 overflow-hidden">
//               <img
//                 src={item.image}
//                 alt={item.category}
//                 className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent opacity-60" />
//             </div>
//             <div className="p-4">
//               <h3 className="text-lg font-semibold text-white text-center group-hover:text-[#00d1ff] transition-colors">
//                 {item.category}
//               </h3>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Right Scroll Button */}
//       {showRightButton && (
//         <button
//           onClick={() => scroll('right')}
//           className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#00d1ff] hover:bg-[#00b8e6] text-[#0f172a] p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
//           aria-label="Scroll right"
//         >
//           <ChevronRight size={24} />
//         </button>
//       )}
//     </div>
//   );
// }

// export default CategoryCard;




import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function CategoryCard({ categories }) {
  const scrollRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
      
      // Calculate active index for pagination
      const cardWidth = clientWidth * 0.7; // 70% card width on mobile
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(index, categories.length - 1));
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = isMobile 
        ? scrollRef.current.clientWidth * 0.7 // Scroll one card on mobile
        : 300;
      
      const newScrollLeft = direction === 'left' 
        ? scrollRef.current.scrollLeft - scrollAmount
        : scrollRef.current.scrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const scrollToIndex = (index) => {
    if (scrollRef.current) {
      const cardWidth = isMobile 
        ? scrollRef.current.clientWidth * 0.7
        : scrollRef.current.clientWidth * 0.25;
      
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    checkScrollPosition();
  };

  return (
    <div className="relative w-full mb-8">
      {/* Section Title */}
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="text-xl md:text-2xl font-bold">Inspiration for your first order </h2>
        {isMobile && showRightButton && (
          <span className="text-sm text-gray-400">
            Swipe →
          </span>
        )}
      </div>

      {/* Left Scroll Button - Desktop Only */}
      {!isMobile && showLeftButton && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#00d1ff] hover:bg-[#00b8e6] text-[#0f172a] p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Categories Container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className={`
          flex gap-4 overflow-x-auto scroll-smooth px-2
          ${isMobile ? 'scroll-snap-x scroll-snap-mandatory' : ''}
        `}
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {categories.map((item, index) => (
          <div
            key={index}
            className={`
              flex-shrink-0 bg-[#1e293b] border border-slate-700 rounded-2xl 
              overflow-hidden hover:border-[#00d1ff]/50 transition-all duration-300 
              cursor-pointer group hover:scale-105 hover:shadow-lg hover:shadow-[#00d1ff]/20
              ${isMobile ? 'scroll-snap-align-start w-[70%]' : 'w-40 md:w-48'}
            `}
            onClick={() => console.log(`Selected: ${item.category}`)}
          >
            <div className="relative h-32 md:h-40 overflow-hidden">
              <img
                src={item.image}
                alt={item.category}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading={index < 3 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-60" />
            </div>
            <div className="p-3 md:p-4">
              <h3 className="text-base md:text-lg font-semibold text-white text-center group-hover:text-[#00d1ff] transition-colors">
                {item.category}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Right Scroll Button - Desktop Only */}
      {!isMobile && showRightButton && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#00d1ff] hover:bg-[#00b8e6] text-[#0f172a] p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Scroll right"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Pagination Dots - Mobile Only */}
      {isMobile && (
        <div className="flex justify-center gap-2 mt-4">
          {categories.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`
                transition-all duration-300 rounded-full
                ${index === activeIndex 
                  ? 'w-8 h-2 bg-[#00d1ff]' 
                  : 'w-2 h-2 bg-slate-600 hover:bg-slate-500'
                }
              `}
              aria-label={`Go to category ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar - Mobile */}
      {isMobile && (
        <div className="mt-3 h-1 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#00d1ff] transition-all duration-300"
            style={{ 
              width: `${((activeIndex + 1) / categories.length) * 100}%` 
            }}
          />
        </div>
      )}
    </div>
  );
}

export default CategoryCard;