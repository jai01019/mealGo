
// import React from 'react'
// import { useState,useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// import { useNavigate } from 'react-router-dom';
// import { Plus, Edit2, MapPin, Store, Package, TrendingUp, DollarSign, Utensils, ChefHat, Users, ArrowRight, X } from 'lucide-react';
// import axios from 'axios';
// import Navbar from './Navbar';  
// import { clearUser } from '../redux/userSlice';
// import { setShopData } from '../redux/ownerSlice';
// import { FaEdit } from "react-icons/fa"; 
// function OwnerDashboard() {
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [showAddItemModal, setShowAddItemModal] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     category: 'Snacks',
//     price: '',
//     foodType: 'veg',
//     image: null
//   });
//   const [imagePreview, setImagePreview] = useState(null);
  
//   const { myShopData } = useSelector((state) => state.owner);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  

// // 🟢 AUTO REFRESH SHOP DATA WHEN DASHBOARD LOADS
// useEffect(() => {

//   const fetchShop = async () => {

//     try {

//       const res = await fetch(
//         `${import.meta.env.VITE_SERVER_URL}/api/shop/getShop`,
//         {
//           credentials: 'include',
//           cache: 'no-store' // 🔴 avoid cache
//         }
//       );

//       const data = await res.json();

//       if (data.success) {
//         dispatch(setShopData(data.shop)); // Update Redux
//       }

//     } catch (err) {
//       console.error("Failed to fetch shop:", err);
//     }

//   };

//   fetchShop();

// }, []); // Run once on page load



//   const handleLogout = async () => {  
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_SERVER_URL}/api/auth/signout`,
//         { withCredentials: true }
//       );

//       if (response.data.success) {
//         console.log("Logged out successfully");
//         dispatch(clearUser()); 
//         navigate('/signin'); 
//       }
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   const handleNavigate = () => {
//     navigate('/create-edit-shop')
//   };

//   const handleEditShop = () => {
//     navigate('/create-edit-shop');
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData(prev => ({
//         ...prev,
//         image: file
//       }));
      
//       // Create preview
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleAddItemSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append('name', formData.name);
//       formDataToSend.append('category', formData.category);
//       formDataToSend.append('price', formData.price);
//       formDataToSend.append('foodType', formData.foodType);
//       if (formData.image) {
//         formDataToSend.append('image', formData.image);
//       }

//       const response = await axios.post(
//         `${import.meta.env.VITE_SERVER_URL}/api/item/create`,
//         formDataToSend,
//         {
//           withCredentials: true,
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           }
//         }
//       );

//       if (response.data.success) {
//         console.log("Item created successfully");
//         const createdItem = response.data.item;

//         // 🔹 Update Redux so all items (old + newly created) show in UI
//         if (myShopData) {
//           const existingItems = myShopData.items || [];
//           const updatedShop = {
//             ...myShopData,
//             items: [...existingItems, createdItem],
//           };
//           dispatch(setShopData(updatedShop));
//         }
//         // Reset form
//         setFormData({
//           name: '',
//           category: 'Snacks',
//           price: '',
//           foodType: 'veg',
//           image: null
//         });
//         setImagePreview(null);
//         setShowAddItemModal(false);
        
//         // Optionally refresh the page or update Redux state
//         //window.location.reload();
//       }
//     } catch (error) {
//       console.error("Failed to create item:", error);
//       alert(error.response?.data?.message || "Failed to create item");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Mock stats - replace with actual data from your backend
//   const stats = {
//     totalItems: myShopData?.items?.length || 0,
//     totalOrders: 234,
//     revenue: 12450,
//     rating: 4.5
//   };

//   const getCategoryColor = (category) => {
//     const colors = {
//       'Pizza': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
//       'Burgers': 'bg-orange-500/10 text-orange-400 border-orange-500/30',
//       'Desserts': 'bg-pink-500/10 text-pink-400 border-pink-500/30',
//       'Main Course': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
//       'Snacks': 'bg-green-500/10 text-green-400 border-green-500/30',
//       'South Indian': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
//       'North Indian': 'bg-red-500/10 text-red-400 border-red-500/30',
//       'Chinese': 'bg-rose-500/10 text-rose-400 border-rose-500/30',
//       'Fast Food': 'bg-amber-500/10 text-amber-400 border-amber-500/30',
//       'Sandwiches': 'bg-teal-500/10 text-teal-400 border-teal-500/30',
//     };
//     return colors[category] || 'bg-slate-500/10 text-slate-400 border-slate-500/30';
//   };

//   const categories = [
//     "Snacks",
//     "Main Course",
//     "Desserts",
//     "Pizza",
//     "Burgers",
//     "Sandwiches",
//     "South Indian",
//     "North Indian",
//     "Chinese",
//     "Fast Food",
//     "Others"
//   ];

//   return (
//     <>
//       <div className="min-h-screen bg-[#0f172a] text-white font-sans flex flex-col">
//         <Navbar 
//           isSearchOpen={isSearchOpen} 
//           setIsSearchOpen={setIsSearchOpen} 
//           onLogout={handleLogout} 
//         />
  
//         {!myShopData && ( 
//           <div className="min-h-screen bg-[#0f172a] text-white font-sans flex items-center justify-center p-4">
//             <div className="flex justify-center w-full max-w-6xl">
//               <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 shadow-2xl max-w-2xl w-full border border-slate-700/50 overflow-hidden">
//                 <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#ff4d24]/10 to-transparent rounded-full blur-3xl"></div>
//                 <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-3xl"></div>
                
//                 <div className="relative z-10">
//                   <div className="flex justify-center mb-6">
//                     <div className="relative">
//                       <div className="absolute inset-0 bg-gradient-to-br from-[#ff4d24] to-[#ff6b47] rounded-3xl blur-xl opacity-50 animate-pulse"></div>
//                       <div className="relative bg-gradient-to-br from-[#ff4d24] to-[#ff6b47] p-6 rounded-3xl shadow-lg">
//                         <Utensils size={56} strokeWidth={2.5} className="text-white" />
//                       </div>
//                     </div>
//                   </div>

//                   <h2 className="text-white text-3xl sm:text-4xl font-bold mb-4 text-center">
//                     Launch Your Restaurant
//                   </h2>
                  
//                   <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 text-center max-w-lg mx-auto">
//                     Join our food delivery platform and reach thousands of hungry customers every day. Start growing your business today!
//                   </p>

//                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
//                     <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 border border-slate-700/50">
//                       <div className="p-2 bg-blue-500/10 rounded-lg">
//                         <Users className="w-5 h-5 text-blue-400" />
//                       </div>
//                       <div>
//                         <p className="text-xs text-slate-400">Reach</p>
//                         <p className="text-sm font-semibold text-white">1000+ Users</p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 border border-slate-700/50">
//                       <div className="p-2 bg-green-500/10 rounded-lg">
//                         <TrendingUp className="w-5 h-5 text-green-400" />
//                       </div>
//                       <div>
//                         <p className="text-xs text-slate-400">Growth</p>
//                         <p className="text-sm font-semibold text-white">Fast Setup</p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 border border-slate-700/50">
//                       <div className="p-2 bg-purple-500/10 rounded-lg">
//                         <ChefHat className="w-5 h-5 text-purple-400" />
//                       </div>
//                       <div>
//                         <p className="text-xs text-slate-400">Quality</p>
//                         <p className="text-sm font-semibold text-white">Top Rated</p>
//                       </div>
//                     </div>
//                   </div>

//                   <button 
//                     onClick={handleNavigate}
//                     className="group relative w-full bg-gradient-to-r from-[#ff4d24] to-[#ff6b47] hover:from-[#ff6b47] hover:to-[#ff4d24] text-white font-bold py-4 px-12 rounded-2xl transition-all duration-300 active:scale-95 shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 overflow-hidden"
//                   >
//                     <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
//                     <span className="relative flex items-center justify-center gap-2 text-lg">
//                       Get Started
//                       <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                     </span>
//                   </button>

//                   <p className="text-center text-slate-500 text-sm mt-6">
//                     Free to join • No hidden fees • Start earning today
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {myShopData && (
//           <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
//             {/* Shop Header Card */}
//             <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-700/50 overflow-hidden mb-8">
//               <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#ff4d24]/5 to-transparent rounded-full blur-3xl"></div>
              
//               <div className="relative z-10 flex flex-col lg:flex-row gap-6 items-start lg:items-center">
//                 <div className="relative group">
//                   <div className="absolute -inset-1 bg-gradient-to-r from-[#ff4d24] to-[#ff6b47] rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
//                   <img 
//                     src={myShopData.image} 
//                     alt={myShopData.name}
//                     className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover border-2 border-slate-700"
//                   />
//                 </div>

//                 <div className="flex-1">
//                   <div className="flex items-start justify-between gap-4 mb-3">
//                     <div>
//                       <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{myShopData.name}</h1>
//                       <div className="flex items-center gap-2 text-slate-300">
//                         <MapPin className="w-4 h-4 text-[#ff4d24]" />
//                         <p className="text-sm sm:text-base">{myShopData.address}, {myShopData.city}, {myShopData.state}</p>
//                       </div>
//                     </div>
//                     <button
//                       onClick={handleEditShop}
//                       className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-xl transition-colors border border-slate-600"
//                     >
//                       <Edit2 className="w-4 h-4" />
//                       <span className="hidden sm:inline">Edit</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Stats Grid */}
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//               <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-2xl p-4 sm:p-6">
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="p-2 bg-blue-500/20 rounded-lg">
//                     <Package className="w-5 h-5 text-blue-400" />
//                   </div>
//                   <p className="text-slate-400 text-sm">Total Items</p>
//                 </div>
//                 <p className="text-2xl sm:text-3xl font-bold text-white">{stats.totalItems}</p>
//               </div>

//               <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-2xl p-4 sm:p-6">
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="p-2 bg-green-500/20 rounded-lg">
//                     <TrendingUp className="w-5 h-5 text-green-400" />
//                   </div>
//                   <p className="text-slate-400 text-sm">Orders</p>
//                 </div>
//                 <p className="text-2xl sm:text-3xl font-bold text-white">{stats.totalOrders}</p>
//               </div>

//               <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-2xl p-4 sm:p-6">
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="p-2 bg-purple-500/20 rounded-lg">
//                     <DollarSign className="w-5 h-5 text-purple-400" />
//                   </div>
//                   <p className="text-slate-400 text-sm">Revenue</p>
//                 </div>
//                 <p className="text-2xl sm:text-3xl font-bold text-white">₹{stats.revenue}</p>
//               </div>

//               <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-2xl p-4 sm:p-6">
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="p-2 bg-yellow-500/20 rounded-lg">
//                     <Store className="w-5 h-5 text-yellow-400" />
//                   </div>
//                   <p className="text-slate-400 text-sm">Rating</p>
//                 </div>
//                 <p className="text-2xl sm:text-3xl font-bold text-white">{stats.rating} ⭐</p>
//               </div>
//             </div>

//             {/* Menu Section */}
//             <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-700/50">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-2xl sm:text-3xl font-bold text-white">Your Menu</h2>
//                 <button
//                   onClick={() => setShowAddItemModal(true)}
//                   className="group flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#ff4d24] to-[#ff6b47] hover:from-[#ff6b47] hover:to-[#ff4d24] rounded-xl transition-all duration-300 active:scale-95 shadow-lg shadow-orange-500/25"
//                 >
//                   <Plus className="w-5 h-5" />
//                   <span className="font-semibold">Add Item</span>
//                 </button>
//               </div>

//               {(!myShopData.items || myShopData.items.length === 0) ? (
//                 <div className="text-center py-16">
//                   <div className="flex justify-center mb-4">
//                     <div className="p-6 bg-slate-800/50 rounded-full">
//                       <Utensils className="w-16 h-16 text-slate-600" />
//                     </div>
//                   </div>
//                   <h3 className="text-xl font-semibold text-slate-400 mb-2">No items yet</h3>
//                   <p className="text-slate-500 mb-6">Start building your menu by adding your first item</p>
//                   <button
//                     onClick={() => setShowAddItemModal(true)}
//                     className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff4d24] to-[#ff6b47] rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all"
//                   >
//                     <Plus className="w-5 h-5" />
//                     Add First Item
//                   </button>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//                   {myShopData.items.map((item, index) => (
//                     <div
//                       key={item._id || index}
//                       className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/50"
//                     >
//                       <div className="relative h-48 overflow-hidden">
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                         />
//                         {/* <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div> */}
                        
//                         <div className="absolute top-3 left-3">
//                           <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                             item.foodType === 'veg' 
//                               ? 'bg-green-500 text-black border border-green-500/30' 
//                               : 'bg-red-500 text-black border border-red-500/30'
//                           }`}>
//                             {item.foodType === 'veg' ? '🌱 Veg' : '🍗 Non-Veg'}
//                           </span>
//                         </div>


//                       </div>

//                       <div className="p-4">
//                         <div className="flex items-start justify-between mb-2">
//                           <h3 className="text-lg font-bold text-white line-clamp-1">{item.name}</h3>
//                           <span className="text-xl font-bold text-[#ff4d24]">₹{item.price}</span>
//                         </div>
                        
//                         <div className=" flex items-center justify-between gap-2">
                        
//                           <span className={` px-3 py-1 rounded-lg text-xs font-medium border ${getCategoryColor(item.category)}`}>
//                             {item.category}
//                           </span>
                        
                          
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Add Item Modal */}
//         {showAddItemModal && (
//           <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//             <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-slate-700/50 max-h-[90vh] overflow-y-auto">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-2xl sm:text-3xl font-bold text-white">Add New Item</h2>
//                 <button
//                   onClick={() => setShowAddItemModal(false)}
//                   className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
//                 >
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>

//               <form onSubmit={handleAddItemSubmit} className="space-y-6">
//                 {/* Item Name */}
//                 <div>
//                   <label className="block text-sm font-medium text-slate-300 mb-2">
//                     Item Name *
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#ff4d24] transition-colors"
//                     placeholder="e.g., Margherita Pizza"
//                   />
//                 </div>

//                 {/* Category */}
//                 <div>
//                   <label className="block text-sm font-medium text-slate-300 mb-2">
//                     Category *
//                   </label>
//                   <select
//                     name="category"
//                     value={formData.category}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#ff4d24] transition-colors"
//                   >
//                     {categories.map(cat => (
//                       <option key={cat} value={cat}>{cat}</option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Price */}
//                 <div>
//                   <label className="block text-sm font-medium text-slate-300 mb-2">
//                     Price (₹) *
//                   </label>
//                   <input
//                     type="number"
//                     name="price"
//                     value={formData.price}
//                     onChange={handleInputChange}
//                     required
//                     min="0"
//                     step="1"
//                     className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#ff4d24] transition-colors"
//                     placeholder="e.g., 299"
//                   />
//                 </div>

//                 {/* Food Type */}
//                 <div>
//                   <label className="block text-sm font-medium text-slate-300 mb-2">
//                     Food Type *
//                   </label>
//                   <div className="flex gap-4">
//                     <label className="flex items-center gap-2 cursor-pointer">
//                       <input
//                         type="radio"
//                         name="foodType"
//                         value="veg"
//                         checked={formData.foodType === 'veg'}
//                         onChange={handleInputChange}
//                         className="w-4 h-4 text-[#ff4d24]"
//                       />
//                       <span className="text-white">🌱 Veg</span>
//                     </label>
//                     <label className="flex items-center gap-2 cursor-pointer">
//                       <input
//                         type="radio"
//                         name="foodType"
//                         value="non veg"
//                         checked={formData.foodType === 'non veg'}
//                         onChange={handleInputChange}
//                         className="w-4 h-4 text-[#ff4d24]"
//                       />
//                       <span className="text-white">🍗 Non-Veg</span>
//                     </label>
//                   </div>
//                 </div>

//                 {/* Image Upload */}
//                 <div>
//                   <label className="block text-sm font-medium text-slate-300 mb-2">
//                     Item Image *
//                   </label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     required
//                     className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#ff4d24] file:text-white file:cursor-pointer hover:file:bg-[#ff6b47] transition-colors"
//                   />
//                   {imagePreview && (
//                     <div className="mt-4">
//                       <img
//                         src={imagePreview}
//                         alt="Preview"
//                         className="w-full h-48 object-cover rounded-xl border border-slate-700"
//                       />
//                     </div>
//                   )}
//                 </div>

//                 {/* Submit Button */}
//                 <div className="flex gap-4">
//                   <button
//                     type="button"
//                     onClick={() => setShowAddItemModal(false)}
//                     className="flex-1 px-6 py-3 bg-slate-700/50 hover:bg-slate-700 rounded-xl font-semibold transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="flex-1 px-6 py-3 bg-gradient-to-r from-[#ff4d24] to-[#ff6b47] hover:from-[#ff6b47] hover:to-[#ff4d24] rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {isSubmitting ? 'Adding...' : 'Add Item'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default OwnerDashboard;

//////////////////////////////////////////////////////////////////

// import React from 'react'
// import { useState,useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// import { useNavigate } from 'react-router-dom';
// import { Plus, Edit2, MapPin, Store, Package, TrendingUp, DollarSign, Utensils, ChefHat, Users, ArrowRight, X, Trash2 } from 'lucide-react';
// import axios from 'axios';
// import Navbar from './Navbar';  
// import { clearUser } from '../redux/userSlice';
// import { setShopData } from '../redux/ownerSlice';
// import { FaEdit } from "react-icons/fa"; 
// function OwnerDashboard() {
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [showAddItemModal, setShowAddItemModal] = useState(false);
//   const [showEditItemModal, setShowEditItemModal] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     category: 'Snacks',
//     price: '',
//     foodType: 'veg',
//     image: null
//   });
//   const [editFormData, setEditFormData] = useState({
//     _id: '',
//     name: '',
//     category: 'Snacks',
//     price: '',
//     foodType: 'veg',
//     image: null,
//     existingImageUrl: ''
//   });
//   const [imagePreview, setImagePreview] = useState(null);
//   const [editImagePreview, setEditImagePreview] = useState(null);
//   const [deleteConfirm, setDeleteConfirm] = useState({
//     show: false,
//     itemId: null,
//     itemName: ''
//   });
  
//   const { myShopData } = useSelector((state) => state.owner);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  

// // 🟢 AUTO REFRESH SHOP DATA WHEN DASHBOARD LOADS
// useEffect(() => {

//   const fetchShop = async () => {

//     try {

//       const res = await fetch(
//         `${import.meta.env.VITE_SERVER_URL}/api/shop/getShop`,
//         {
//           credentials: 'include',
//           cache: 'no-store' // 🔴 avoid cache
//         }
//       );

//       const data = await res.json();

//       if (data.success) {
//         dispatch(setShopData(data.shop)); // Update Redux
//       }

//     } catch (err) {
//       console.error("Failed to fetch shop:", err);
//     }

//   };

//   fetchShop();

// }, []); // Run once on page load



//   const handleLogout = async () => {  
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_SERVER_URL}/api/auth/signout`,
//         { withCredentials: true }
//       );

//       if (response.data.success) {
//         console.log("Logged out successfully");
//         dispatch(clearUser()); 
//         navigate('/signin'); 
//       }
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   const handleNavigate = () => {
//     navigate('/create-edit-shop')
//   };

//   const handleEditShop = () => {
//     navigate('/create-edit-shop');
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleEditInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData(prev => ({
//         ...prev,
//         image: file
//       }));
      
//       // Create preview
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleEditImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setEditFormData(prev => ({
//         ...prev,
//         image: file
//       }));
      
//       // Create preview
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setEditImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleAddItemSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append('name', formData.name);
//       formDataToSend.append('category', formData.category);
//       formDataToSend.append('price', formData.price);
//       formDataToSend.append('foodType', formData.foodType);
//       if (formData.image) {
//         formDataToSend.append('image', formData.image);
//       }

//       const response = await axios.post(
//         `${import.meta.env.VITE_SERVER_URL}/api/item/create`,
//         formDataToSend,
//         {
//           withCredentials: true,
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           }
//         }
//       );

//       if (response.data.success) {
//         console.log("Item created successfully");
//         const createdItem = response.data.item;

//         // 🔹 Update Redux so all items (old + newly created) show in UI
//         if (myShopData) {
//           const existingItems = myShopData.items || [];
//           const updatedShop = {
//             ...myShopData,
//             items: [...existingItems, createdItem],
//           };
//           dispatch(setShopData(updatedShop));
//         }
//         // Reset form
//         setFormData({
//           name: '',
//           category: 'Snacks',
//           price: '',
//           foodType: 'veg',
//           image: null
//         });
//         setImagePreview(null);
//         setShowAddItemModal(false);
//       }
//     } catch (error) {
//       console.error("Failed to create item:", error);
//       alert(error.response?.data?.message || "Failed to create item");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleEditItem = (item) => {
//     setEditFormData({
//       _id: item._id,
//       name: item.name,
//       category: item.category,
//       price: item.price,
//       foodType: item.foodType,
//       image: null,
//       existingImageUrl: item.image
//     });
//     setEditImagePreview(item.image);
//     setShowEditItemModal(true);
//   };

//   const handleEditItemSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append('name', editFormData.name);
//       formDataToSend.append('category', editFormData.category);
//       formDataToSend.append('price', editFormData.price);
//       formDataToSend.append('foodType', editFormData.foodType);
      
//       // Only append new image if one was selected
//       if (editFormData.image) {
//         formDataToSend.append('image', editFormData.image);
//       }

//       const response = await axios.put(
//         `${import.meta.env.VITE_SERVER_URL}/api/item/update/${editFormData._id}`,
//         formDataToSend,
//         {
//           withCredentials: true,
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           }
//         }
//       );

//       if (response.data.success) {
//         console.log("Item updated successfully");
//         const updatedItem = response.data.item;

//         // Update Redux state
//         if (myShopData) {
//           const updatedItems = myShopData.items.map(item => 
//             item._id === updatedItem._id ? updatedItem : item
//           );
//           const updatedShop = {
//             ...myShopData,
//             items: updatedItems,
//           };
//           dispatch(setShopData(updatedShop));
//         }

//         // Reset form
//         setEditFormData({
//           _id: '',
//           name: '',
//           category: 'Snacks',
//           price: '',
//           foodType: 'veg',
//           image: null,
//           existingImageUrl: ''
//         });
//         setEditImagePreview(null);
//         setShowEditItemModal(false);
//       }
//     } catch (error) {
//       console.error("Failed to update item:", error);
//       alert(error.response?.data?.message || "Failed to update item");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDeleteItem = async (itemId) => {
//     try {
//       const response = await axios.delete(
//         `${import.meta.env.VITE_SERVER_URL}/api/item/delete/${itemId}`,
//         { withCredentials: true }
//       );

//       if (response.data.success) {
//         console.log("Item deleted successfully");
        
//         // Update Redux state
//         if (myShopData) {
//           const updatedItems = myShopData.items.filter(item => item._id !== itemId);
//           const updatedShop = {
//             ...myShopData,
//             items: updatedItems,
//           };
//           dispatch(setShopData(updatedShop));
//         }
        
//         setDeleteConfirm({ show: false, itemId: null, itemName: '' });
//       }
//     } catch (error) {
//       console.error("Failed to delete item:", error);
//       alert(error.response?.data?.message || "Failed to delete item");
//     }
//   };

//   // Mock stats - replace with actual data from your backend
//   const stats = {
//     totalItems: myShopData?.items?.length || 0,
//     totalOrders: 234,
//     revenue: 12450,
//     rating: 4.5
//   };

//   const getCategoryColor = (category) => {
//     const colors = {
//       'Pizza': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
//       'Burgers': 'bg-orange-500/10 text-orange-400 border-orange-500/30',
//       'Desserts': 'bg-pink-500/10 text-pink-400 border-pink-500/30',
//       'Main Course': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
//       'Snacks': 'bg-green-500/10 text-green-400 border-green-500/30',
//       'South Indian': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
//       'North Indian': 'bg-red-500/10 text-red-400 border-red-500/30',
//       'Chinese': 'bg-rose-500/10 text-rose-400 border-rose-500/30',
//       'Fast Food': 'bg-amber-500/10 text-amber-400 border-amber-500/30',
//       'Sandwiches': 'bg-teal-500/10 text-teal-400 border-teal-500/30',
//     };
//     return colors[category] || 'bg-slate-500/10 text-slate-400 border-slate-500/30';
//   };

//   const categories = [
//     "Snacks",
//     "Main Course",
//     "Desserts",
//     "Pizza",
//     "Burgers",
//     "Sandwiches",
//     "South Indian",
//     "North Indian",
//     "Chinese",
//     "Fast Food",
//     "Others"
//   ];

//   return (
//     <>
//       <div className="min-h-screen bg-[#0f172a] text-white font-sans flex flex-col">
//         <Navbar 
//           isSearchOpen={isSearchOpen} 
//           setIsSearchOpen={setIsSearchOpen} 
//           onLogout={handleLogout} 
//         />
  
//         {!myShopData && ( 
//           <div className="min-h-screen bg-[#0f172a] text-white font-sans flex items-center justify-center p-4">
//             <div className="flex justify-center w-full max-w-6xl">
//               <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 shadow-2xl max-w-2xl w-full border border-slate-700/50 overflow-hidden">
//                 <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#ff4d24]/10 to-transparent rounded-full blur-3xl"></div>
//                 <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-3xl"></div>
                
//                 <div className="relative z-10">
//                   <div className="flex justify-center mb-6">
//                     <div className="relative">
//                       <div className="absolute inset-0 bg-gradient-to-br from-[#ff4d24] to-[#ff6b47] rounded-3xl blur-xl opacity-50 animate-pulse"></div>
//                       <div className="relative bg-gradient-to-br from-[#ff4d24] to-[#ff6b47] p-6 rounded-3xl shadow-lg">
//                         <Utensils size={56} strokeWidth={2.5} className="text-white" />
//                       </div>
//                     </div>
//                   </div>

//                   <h2 className="text-white text-3xl sm:text-4xl font-bold mb-4 text-center">
//                     Launch Your Restaurant
//                   </h2>
                  
//                   <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 text-center max-w-lg mx-auto">
//                     Join our food delivery platform and reach thousands of hungry customers every day. Start growing your business today!
//                   </p>

//                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
//                     <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 border border-slate-700/50">
//                       <div className="p-2 bg-blue-500/10 rounded-lg">
//                         <Users className="w-5 h-5 text-blue-400" />
//                       </div>
//                       <div>
//                         <p className="text-xs text-slate-400">Reach</p>
//                         <p className="text-sm font-semibold text-white">1000+ Users</p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 border border-slate-700/50">
//                       <div className="p-2 bg-green-500/10 rounded-lg">
//                         <TrendingUp className="w-5 h-5 text-green-400" />
//                       </div>
//                       <div>
//                         <p className="text-xs text-slate-400">Growth</p>
//                         <p className="text-sm font-semibold text-white">Fast Setup</p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 border border-slate-700/50">
//                       <div className="p-2 bg-purple-500/10 rounded-lg">
//                         <ChefHat className="w-5 h-5 text-purple-400" />
//                       </div>
//                       <div>
//                         <p className="text-xs text-slate-400">Quality</p>
//                         <p className="text-sm font-semibold text-white">Top Rated</p>
//                       </div>
//                     </div>
//                   </div>

//                   <button 
//                     onClick={handleNavigate}
//                     className="group relative w-full bg-gradient-to-r from-[#ff4d24] to-[#ff6b47] hover:from-[#ff6b47] hover:to-[#ff4d24] text-white font-bold py-4 px-12 rounded-2xl transition-all duration-300 active:scale-95 shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 overflow-hidden"
//                   >
//                     <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
//                     <span className="relative flex items-center justify-center gap-2 text-lg">
//                       Get Started
//                       <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                     </span>
//                   </button>

//                   <p className="text-center text-slate-500 text-sm mt-6">
//                     Free to join • No hidden fees • Start earning today
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {myShopData && (
//           <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
//             {/* Shop Header Card */}
//             <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-700/50 overflow-hidden mb-8">
//               <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#ff4d24]/5 to-transparent rounded-full blur-3xl"></div>
              
//               <div className="relative z-10 flex flex-col lg:flex-row gap-6 items-start lg:items-center">
//                 <div className="relative group">
//                   <div className="absolute -inset-1 bg-gradient-to-r from-[#ff4d24] to-[#ff6b47] rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
//                   <img 
//                     src={myShopData.image} 
//                     alt={myShopData.name}
//                     className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover border-2 border-slate-700"
//                   />
//                 </div>

//                 <div className="flex-1">
//                   <div className="flex items-start justify-between gap-4 mb-3">
//                     <div>
//                       <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{myShopData.name}</h1>
//                       <div className="flex items-center gap-2 text-slate-300">
//                         <MapPin className="w-4 h-4 text-[#ff4d24]" />
//                         <p className="text-sm sm:text-base">{myShopData.address}, {myShopData.city}, {myShopData.state}</p>
//                       </div>
//                     </div>
//                     <button
//                       onClick={handleEditShop}
//                       className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-xl transition-colors border border-slate-600"
//                     >
//                       <Edit2 className="w-4 h-4" />
//                       <span className="hidden sm:inline">Edit</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Stats Grid */}
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//               <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-2xl p-4 sm:p-6">
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="p-2 bg-blue-500/20 rounded-lg">
//                     <Package className="w-5 h-5 text-blue-400" />
//                   </div>
//                   <p className="text-slate-400 text-sm">Total Items</p>
//                 </div>
//                 <p className="text-2xl sm:text-3xl font-bold text-white">{stats.totalItems}</p>
//               </div>

//               <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-2xl p-4 sm:p-6">
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="p-2 bg-green-500/20 rounded-lg">
//                     <TrendingUp className="w-5 h-5 text-green-400" />
//                   </div>
//                   <p className="text-slate-400 text-sm">Orders</p>
//                 </div>
//                 <p className="text-2xl sm:text-3xl font-bold text-white">{stats.totalOrders}</p>
//               </div>

//               <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-2xl p-4 sm:p-6">
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="p-2 bg-purple-500/20 rounded-lg">
//                     <DollarSign className="w-5 h-5 text-purple-400" />
//                   </div>
//                   <p className="text-slate-400 text-sm">Revenue</p>
//                 </div>
//                 <p className="text-2xl sm:text-3xl font-bold text-white">₹{stats.revenue}</p>
//               </div>

//               <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-2xl p-4 sm:p-6">
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="p-2 bg-yellow-500/20 rounded-lg">
//                     <Store className="w-5 h-5 text-yellow-400" />
//                   </div>
//                   <p className="text-slate-400 text-sm">Rating</p>
//                 </div>
//                 <p className="text-2xl sm:text-3xl font-bold text-white">{stats.rating} ⭐</p>
//               </div>
//             </div>

//             {/* Menu Section */}
//             <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-700/50">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-2xl sm:text-3xl font-bold text-white">Your Menu</h2>
//                 <button
//                   onClick={() => setShowAddItemModal(true)}
//                   className="group flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#ff4d24] to-[#ff6b47] hover:from-[#ff6b47] hover:to-[#ff4d24] rounded-xl transition-all duration-300 active:scale-95 shadow-lg shadow-orange-500/25"
//                 >
//                   <Plus className="w-5 h-5" />
//                   <span className="font-semibold">Add Item</span>
//                 </button>
//               </div>

//               {(!myShopData.items || myShopData.items.length === 0) ? (
//                 <div className="text-center py-16">
//                   <div className="flex justify-center mb-4">
//                     <div className="p-6 bg-slate-800/50 rounded-full">
//                       <Utensils className="w-16 h-16 text-slate-600" />
//                     </div>
//                   </div>
//                   <h3 className="text-xl font-semibold text-slate-400 mb-2">No items yet</h3>
//                   <p className="text-slate-500 mb-6">Start building your menu by adding your first item</p>
//                   <button
//                     onClick={() => setShowAddItemModal(true)}
//                     className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff4d24] to-[#ff6b47] rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all"
//                   >
//                     <Plus className="w-5 h-5" />
//                     Add First Item
//                   </button>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//                   {myShopData.items.map((item, index) => (
//                     <div
//                       key={item._id || index}
//                       className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/50"
//                     >
//                       <div className="relative h-48 overflow-hidden">
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                         />
                        
//                         <div className="absolute top-3 left-3">
//                           <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                             item.foodType === 'veg' 
//                               ? 'bg-green-500 text-black border border-green-500/30' 
//                               : 'bg-red-500 text-black border border-red-500/30'
//                           }`}>
//                             {item.foodType === 'veg' ? '🌱 Veg' : '🍗 Non-Veg'}
//                           </span>
//                         </div>

//                         {/* Hover Action Buttons */}
//                         <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                           <button
//                             onClick={() => handleEditItem(item)}
//                             className="p-2 bg-blue-500/90 hover:bg-blue-600 rounded-lg transition-colors shadow-lg backdrop-blur-sm"
//                             title="Edit item"
//                           >
//                             <Edit2 className="w-4 h-4 text-white" />
//                           </button>
//                           <button
//                             onClick={() => setDeleteConfirm({ show: true, itemId: item._id, itemName: item.name })}
//                             className="p-2 bg-red-500/90 hover:bg-red-600 rounded-lg transition-colors shadow-lg backdrop-blur-sm"
//                             title="Delete item"
//                           >
//                             <Trash2 className="w-4 h-4 text-white" />
//                           </button>
//                         </div>
//                       </div>

//                       <div className="p-4">
//                         <div className="flex items-start justify-between mb-2">
//                           <h3 className="text-lg font-bold text-white line-clamp-1">{item.name}</h3>
//                           <span className="text-xl font-bold text-[#ff4d24]">₹{item.price}</span>
//                         </div>
                        
//                         <div className="flex items-center justify-between gap-2">
//                           <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getCategoryColor(item.category)}`}>
//                             {item.category}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Add Item Modal */}
//         {showAddItemModal && (
//           <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//             <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-slate-700/50 max-h-[90vh] overflow-y-auto">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-2xl sm:text-3xl font-bold text-white">Add New Item</h2>
//                 <button
//                   onClick={() => setShowAddItemModal(false)}
//                   className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
//                 >
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>

//               <form onSubmit={handleAddItemSubmit} className="space-y-6">
//                 {/* Item Name */}
//                 <div>
//                   <label className="block text-sm font-medium text-slate-300 mb-2">
//                     Item Name *
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#ff4d24] transition-colors"
//                     placeholder="e.g., Margherita Pizza"
//                   />
//                 </div>

//                 {/* Category */}
//                 <div>
//                   <label className="block text-sm font-medium text-slate-300 mb-2">
//                     Category *
//                   </label>
//                   <select
//                     name="category"
//                     value={formData.category}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#ff4d24] transition-colors"
//                   >
//                     {categories.map(cat => (
//                       <option key={cat} value={cat}>{cat}</option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Price */}
//                 <div>
//                   <label className="block text-sm font-medium text-slate-300 mb-2">
//                     Price (₹) *
//                   </label>
//                   <input
//                     type="number"
//                     name="price"
//                     value={formData.price}
//                     onChange={handleInputChange}
//                     required
//                     min="0"
//                     step="1"
//                     className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#ff4d24] transition-colors"
//                     placeholder="e.g., 299"
//                   />
//                 </div>

//                 {/* Food Type */}
//                 <div>
//                   <label className="block text-sm font-medium text-slate-300 mb-2">
//                     Food Type *
//                   </label>
//                   <div className="flex gap-4">
//                     <label className="flex items-center gap-2 cursor-pointer">
//                       <input
//                         type="radio"
//                         name="foodType"
//                         value="veg"
//                         checked={formData.foodType === 'veg'}
//                         onChange={handleInputChange}
//                         className="w-4 h-4 text-[#ff4d24]"
//                       />
//                       <span className="text-white">🌱 Veg</span>
//                     </label>
//                     <label className="flex items-center gap-2 cursor-pointer">
//                       <input
//                         type="radio"
//                         name="foodType"
//                         value="non veg"
//                         checked={formData.foodType === 'non veg'}
//                         onChange={handleInputChange}
//                         className="w-4 h-4 text-[#ff4d24]"
//                       />
//                       <span className="text-white">🍗 Non-Veg</span>
//                     </label>
//                   </div>
//                 </div>

//                 {/* Image Upload */}
//                 <div>
//                   <label className="block text-sm font-medium text-slate-300 mb-2">
//                     Item Image *
//                   </label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     required
//                     className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#ff4d24] file:text-white file:cursor-pointer hover:file:bg-[#ff6b47] transition-colors"
//                   />
//                   {imagePreview && (
//                     <div className="mt-4">
//                       <img
//                         src={imagePreview}
//                         alt="Preview"
//                         className="w-full h-48 object-cover rounded-xl border border-slate-700"
//                       />
//                     </div>
//                   )}
//                 </div>

//                 {/* Submit Button */}
//                 <div className="flex gap-4">
//                   <button
//                     type="button"
//                     onClick={() => setShowAddItemModal(false)}
//                     className="flex-1 px-6 py-3 bg-slate-700/50 hover:bg-slate-700 rounded-xl font-semibold transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="flex-1 px-6 py-3 bg-gradient-to-r from-[#ff4d24] to-[#ff6b47] hover:from-[#ff6b47] hover:to-[#ff4d24] rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {isSubmitting ? 'Adding...' : 'Add Item'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Edit Item Modal */}
//         {showEditItemModal && (
//           <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//             <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-slate-700/50 max-h-[90vh] overflow-y-auto">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-2xl sm:text-3xl font-bold text-white">Edit Item</h2>
//                 <button
//                   onClick={() => {
//                     setShowEditItemModal(false);
//                     setEditImagePreview(null);
//                   }}
//                   className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
//                 >
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>

//               <form onSubmit={handleEditItemSubmit} className="space-y-6">
//                 {/* Item Name */}
//                 <div>
//                   <label className="block text-sm font-medium text-slate-300 mb-2">
//                     Item Name *
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={editFormData.name}
//                     onChange={handleEditInputChange}
//                     required
//                     className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
//                     placeholder="e.g., Margherita Pizza"
//                   />
//                 </div>

//                 {/* Category */}
//                 <div>
//                   <label className="block text-sm font-medium text-slate-300 mb-2">
//                     Category *
//                   </label>
//                   <select
//                     name="category"
//                     value={editFormData.category}
//                     onChange={handleEditInputChange}
//                     required
//                     className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
//                   >
//                     {categories.map(cat => (
//                       <option key={cat} value={cat}>{cat}</option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Price */}
//                 <div>
//                   <label className="block text-sm font-medium text-slate-300 mb-2">
//                     Price (₹) *
//                   </label>
//                   <input
//                     type="number"
//                     name="price"
//                     value={editFormData.price}
//                     onChange={handleEditInputChange}
//                     required
//                     min="0"
//                     step="1"
//                     className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
//                     placeholder="e.g., 299"
//                   />
//                 </div>

//                 {/* Food Type */}
//                 <div>
//                   <label className="block text-sm font-medium text-slate-300 mb-2">
//                     Food Type *
//                   </label>
//                   <div className="flex gap-4">
//                     <label className="flex items-center gap-2 cursor-pointer">
//                       <input
//                         type="radio"
//                         name="foodType"
//                         value="veg"
//                         checked={editFormData.foodType === 'veg'}
//                         onChange={handleEditInputChange}
//                         className="w-4 h-4 text-blue-500"
//                       />
//                       <span className="text-white">🌱 Veg</span>
//                     </label>
//                     <label className="flex items-center gap-2 cursor-pointer">
//                       <input
//                         type="radio"
//                         name="foodType"
//                         value="non veg"
//                         checked={editFormData.foodType === 'non veg'}
//                         onChange={handleEditInputChange}
//                         className="w-4 h-4 text-blue-500"
//                       />
//                       <span className="text-white">🍗 Non-Veg</span>
//                     </label>
//                   </div>
//                 </div>

//                 {/* Image Upload */}
//                 <div>
//                   <label className="block text-sm font-medium text-slate-300 mb-2">
//                     Item Image {editFormData.existingImageUrl && '(Optional - leave empty to keep current)'}
//                   </label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleEditImageChange}
//                     className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-500 file:text-white file:cursor-pointer hover:file:bg-blue-600 transition-colors"
//                   />
//                   {editImagePreview && (
//                     <div className="mt-4">
//                       <p className="text-sm text-slate-400 mb-2">
//                         {editFormData.image ? 'New Image Preview:' : 'Current Image:'}
//                       </p>
//                       <img
//                         src={editImagePreview}
//                         alt="Preview"
//                         className="w-full h-48 object-cover rounded-xl border border-slate-700"
//                       />
//                     </div>
//                   )}
//                 </div>

//                 {/* Submit Button */}
//                 <div className="flex gap-4">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setShowEditItemModal(false);
//                       setEditImagePreview(null);
//                     }}
//                     className="flex-1 px-6 py-3 bg-slate-700/50 hover:bg-slate-700 rounded-xl font-semibold transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25"
//                   >
//                     {isSubmitting ? 'Updating...' : 'Update Item'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Delete Confirmation Modal */}
//         {deleteConfirm.show && (
//           <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//             <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-2xl p-6 sm:p-8 max-w-md w-full border border-slate-700/50 shadow-2xl">
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="p-3 bg-red-500/10 rounded-full">
//                   <Trash2 className="w-6 h-6 text-red-500" />
//                 </div>
//                 <h3 className="text-xl font-bold text-white">Delete Item?</h3>
//               </div>
              
//               <p className="text-slate-300 mb-6">
//                 Are you sure you want to delete <span className="text-white font-semibold">"{deleteConfirm.itemName}"</span>? This action cannot be undone.
//               </p>
              
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setDeleteConfirm({ show: false, itemId: null, itemName: '' })}
//                   className="flex-1 px-6 py-3 bg-slate-700/50 hover:bg-slate-700 rounded-xl font-semibold transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => handleDeleteItem(deleteConfirm.itemId)}
//                   className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl font-semibold transition-all shadow-lg shadow-red-500/25"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default OwnerDashboard;
///////////////////////////////////////////////////////////////////

import React from 'react'
import { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, MapPin, Store, Package, TrendingUp, DollarSign, Utensils, ChefHat, Users, ArrowRight, X, Trash2 } from 'lucide-react';
import axios from 'axios';
import Navbar from './Navbar';  
import { clearUser } from '../redux/userSlice';
import { setShopData } from '../redux/ownerSlice';
import { FaEdit } from "react-icons/fa"; 
function OwnerDashboard() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showEditItemModal, setShowEditItemModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Snacks',
    price: '',
    foodType: 'veg',
    image: null
  });
  const [editFormData, setEditFormData] = useState({
    _id: '',
    name: '',
    category: 'Snacks',
    price: '',
    foodType: 'veg',
    image: null,
    existingImageUrl: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    itemId: null,
    itemName: ''
  });
  
  const { myShopData } = useSelector((state) => state.owner);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

// 🟢 AUTO REFRESH SHOP DATA WHEN DASHBOARD LOADS
useEffect(() => {

  const fetchShop = async () => {

    try {

      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/shop/getShop`,
        {
          credentials: 'include',
          cache: 'no-store' // 🔴 avoid cache
        }
      );

      const data = await res.json();

      if (data.success) {
        dispatch(setShopData(data.shop)); // Update Redux
      }

    } catch (err) {
      console.error("Failed to fetch shop:", err);
    }

  };

  fetchShop();

}, []); // Run once on page load



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

  const handleNavigate = () => {
    navigate('/create-edit-shop')
  };

  const handleEditShop = () => {
    navigate('/create-edit-shop');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditFormData(prev => ({
        ...prev,
        image: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddItemSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('foodType', formData.foodType);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/item/create`,
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
       
        const createdItem = response.data.item;

        // 🔹 Update Redux so all items (old + newly created) show in UI
        if (myShopData) {
          const existingItems = myShopData.items || [];
          const updatedShop = {
            ...myShopData,
            items: [...existingItems, createdItem],
          };
          dispatch(setShopData(updatedShop));
        }
        // Reset form
        setFormData({
          name: '',
          category: 'Snacks',
          price: '',
          foodType: 'veg',
          image: null
        });
        setImagePreview(null);
        setShowAddItemModal(false);
      }
    } catch (error) {
      console.error("Failed to create item:", error);
      alert(error.response?.data?.message || "Failed to create item");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditItem = (item) => {
    setEditFormData({
      _id: item._id,
      name: item.name,
      category: item.category,
      price: item.price,
      foodType: item.foodType,
      image: null,
      existingImageUrl: item.image
    });
    setEditImagePreview(item.image);
    setShowEditItemModal(true);
  };

  const handleEditItemSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', editFormData.name);
      formDataToSend.append('category', editFormData.category);
      formDataToSend.append('price', editFormData.price);
      formDataToSend.append('foodType', editFormData.foodType);
      
      // Only append new image if one was selected
      if (editFormData.image) {
        formDataToSend.append('image', editFormData.image);
      }

      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/item/edit/${editFormData._id}`,
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
    
        const updatedItem = response.data.item;

        // Update Redux state
        if (myShopData) {
          const updatedItems = myShopData.items.map(item => 
            item._id === updatedItem._id ? updatedItem : item
          );
          const updatedShop = {
            ...myShopData,
            items: updatedItems,
          };
          dispatch(setShopData(updatedShop));
        }

        // Reset form
        setEditFormData({
          _id: '',
          name: '',
          category: 'Snacks',
          price: '',
          foodType: 'veg',
          image: null,
          existingImageUrl: ''
        });
        setEditImagePreview(null);
        setShowEditItemModal(false);
      }
    } catch (error) {
      console.error("Failed to update item:", error);
      alert(error.response?.data?.message || "Failed to update item");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/item/delete/${itemId}`,
        { withCredentials: true }
      );

      if (response.data.success) {
       
        
        // Update Redux state
        if (myShopData) {
          const updatedItems = myShopData.items.filter(item => item._id !== itemId);
          const updatedShop = {
            ...myShopData,
            items: updatedItems,
          };
          dispatch(setShopData(updatedShop));
        }
        
        setDeleteConfirm({ show: false, itemId: null, itemName: '' });
      }
    } catch (error) {
      console.error("Failed to delete item:", error);
      alert(error.response?.data?.message || "Failed to delete item");
    }
  };

  // Mock stats - replace with actual data from your backend
  const stats = {
    totalItems: myShopData?.items?.length || 0,
    totalOrders: 234,
    revenue: 12450,
    rating: 4.5
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Pizza': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
      'Burgers': 'bg-orange-500/10 text-orange-400 border-orange-500/30',
      'Desserts': 'bg-pink-500/10 text-pink-400 border-pink-500/30',
      'Main Course': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      'Snacks': 'bg-green-500/10 text-green-400 border-green-500/30',
      'South Indian': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      'North Indian': 'bg-red-500/10 text-red-400 border-red-500/30',
      'Chinese': 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      'Fast Food': 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      'Sandwiches': 'bg-teal-500/10 text-teal-400 border-teal-500/30',
    };
    return colors[category] || 'bg-slate-500/10 text-slate-400 border-slate-500/30';
  };

  const categories = [
    "Snacks",
    "Main Course",
    "Desserts",
    "Pizza",
    "Burgers",
    "Sandwiches",
    "South Indian",
    "North Indian",
    "Chinese",
    "Fast Food",
    "Others"
  ];

  return (
    <>
      <div className="min-h-screen bg-[#0f172a] text-white font-sans flex flex-col">
        <Navbar 
          isSearchOpen={isSearchOpen} 
          setIsSearchOpen={setIsSearchOpen} 
          onLogout={handleLogout} 
        />
  
        {!myShopData && ( 
          <div className="min-h-screen bg-[#0f172a] text-white font-sans flex items-center justify-center p-4">
            <div className="flex justify-center w-full max-w-6xl">
              <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 shadow-2xl max-w-2xl w-full border border-slate-700/50 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#ff4d24]/10 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#ff4d24] to-[#ff6b47] rounded-3xl blur-xl opacity-50 animate-pulse"></div>
                      <div className="relative bg-gradient-to-br from-[#ff4d24] to-[#ff6b47] p-6 rounded-3xl shadow-lg">
                        <Utensils size={56} strokeWidth={2.5} className="text-white" />
                      </div>
                    </div>
                  </div>

                  <h2 className="text-white text-3xl sm:text-4xl font-bold mb-4 text-center">
                    Launch Your Restaurant
                  </h2>
                  
                  <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 text-center max-w-lg mx-auto">
                    Join our food delivery platform and reach thousands of hungry customers every day. Start growing your business today!
                  </p>

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

                  <p className="text-center text-slate-500 text-sm mt-6">
                    Free to join • No hidden fees • Start earning today
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {myShopData && (
          <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            {/* Shop Header Card */}
            <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-700/50 overflow-hidden mb-8">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#ff4d24]/5 to-transparent rounded-full blur-3xl"></div>
              
              <div className="relative z-10 flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#ff4d24] to-[#ff6b47] rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                  <img 
                    src={myShopData.image} 
                    alt={myShopData.name}
                    className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover border-2 border-slate-700"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{myShopData.name}</h1>
                      <div className="flex items-center gap-2 text-slate-300">
                        <MapPin className="w-4 h-4 text-[#ff4d24]" />
                        <p className="text-sm sm:text-base">{myShopData.address}, {myShopData.city}, {myShopData.state}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleEditShop}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-xl transition-colors border border-slate-600"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-2xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Package className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-slate-400 text-sm">Total Items</p>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-white">{stats.totalItems}</p>
              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-2xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <p className="text-slate-400 text-sm">Orders</p>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-white">{stats.totalOrders}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-2xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <DollarSign className="w-5 h-5 text-purple-400" />
                  </div>
                  <p className="text-slate-400 text-sm">Revenue</p>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-white">₹{stats.revenue}</p>
              </div>

              <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-2xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <Store className="w-5 h-5 text-yellow-400" />
                  </div>
                  <p className="text-slate-400 text-sm">Rating</p>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-white">{stats.rating} ⭐</p>
              </div>
            </div>

            {/* Menu Section */}
            <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-700/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Your Menu</h2>
                <button
                  onClick={() => setShowAddItemModal(true)}
                  className="group flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#ff4d24] to-[#ff6b47] hover:from-[#ff6b47] hover:to-[#ff4d24] rounded-xl transition-all duration-300 active:scale-95 shadow-lg shadow-orange-500/25"
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-semibold">Add Item</span>
                </button>
              </div>

              {(!myShopData.items || myShopData.items.length === 0) ? (
                <div className="text-center py-16">
                  <div className="flex justify-center mb-4">
                    <div className="p-6 bg-slate-800/50 rounded-full">
                      <Utensils className="w-16 h-16 text-slate-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-400 mb-2">No items yet</h3>
                  <p className="text-slate-500 mb-6">Start building your menu by adding your first item</p>
                  <button
                    onClick={() => setShowAddItemModal(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff4d24] to-[#ff6b47] rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all"
                  >
                    <Plus className="w-5 h-5" />
                    Add First Item
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {myShopData.items.map((item, index) => (
                    <div
                      key={item._id || index}
                      className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/50"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        
                        <div className="absolute top-3 left-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.foodType === 'veg' 
                              ? 'bg-green-500 text-black border border-green-500/30' 
                              : 'bg-red-500 text-black border border-red-500/30'
                          }`}>
                            {item.foodType === 'veg' ? '🌱 Veg' : '🍗 Non-Veg'}
                          </span>
                        </div>

                        {/* Hover Action Buttons */}
                        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            onClick={() => handleEditItem(item)}
                            className="p-2 bg-blue-500/90 hover:bg-blue-600 rounded-lg transition-colors shadow-lg backdrop-blur-sm"
                            title="Edit item"
                          >
                            <Edit2 className="w-4 h-4 text-white" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm({ show: true, itemId: item._id, itemName: item.name })}
                            className="p-2 bg-red-500/90 hover:bg-red-600 rounded-lg transition-colors shadow-lg backdrop-blur-sm"
                            title="Delete item"
                          >
                            <Trash2 className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-bold text-white line-clamp-1">{item.name}</h3>
                          <span className="text-xl font-bold text-[#ff4d24]">₹{item.price}</span>
                        </div>
                        
                        <div className="flex items-center justify-between gap-2">
                          <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getCategoryColor(item.category)}`}>
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Add Item Modal */}
        {showAddItemModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-slate-700/50 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Add New Item</h2>
                <button
                  onClick={() => setShowAddItemModal(false)}
                  className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleAddItemSubmit} className="space-y-6">
                {/* Item Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Item Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#ff4d24] transition-colors"
                    placeholder="e.g., Margherita Pizza"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#ff4d24] transition-colors"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="1"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#ff4d24] transition-colors"
                    placeholder="e.g., 299"
                  />
                </div>

                {/* Food Type */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Food Type *
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="foodType"
                        value="veg"
                        checked={formData.foodType === 'veg'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-[#ff4d24]"
                      />
                      <span className="text-white">🌱 Veg</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="foodType"
                        value="non veg"
                        checked={formData.foodType === 'non veg'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-[#ff4d24]"
                      />
                      <span className="text-white">🍗 Non-Veg</span>
                    </label>
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Item Image *
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#ff4d24] file:text-white file:cursor-pointer hover:file:bg-[#ff6b47] transition-colors"
                  />
                  {imagePreview && (
                    <div className="mt-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-xl border border-slate-700"
                      />
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowAddItemModal(false)}
                    className="flex-1 px-6 py-3 bg-slate-700/50 hover:bg-slate-700 rounded-xl font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#ff4d24] to-[#ff6b47] hover:from-[#ff6b47] hover:to-[#ff4d24] rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Adding...' : 'Add Item'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Item Modal */}
        {showEditItemModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-slate-700/50 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Edit Item</h2>
                <button
                  onClick={() => {
                    setShowEditItemModal(false);
                    setEditImagePreview(null);
                  }}
                  className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleEditItemSubmit} className="space-y-6">
                {/* Item Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Item Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="e.g., Margherita Pizza"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={editFormData.category}
                    onChange={handleEditInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={editFormData.price}
                    onChange={handleEditInputChange}
                    required
                    min="0"
                    step="1"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="e.g., 299"
                  />
                </div>

                {/* Food Type */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Food Type *
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="foodType"
                        value="veg"
                        checked={editFormData.foodType === 'veg'}
                        onChange={handleEditInputChange}
                        className="w-4 h-4 text-blue-500"
                      />
                      <span className="text-white">🌱 Veg</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="foodType"
                        value="non veg"
                        checked={editFormData.foodType === 'non veg'}
                        onChange={handleEditInputChange}
                        className="w-4 h-4 text-blue-500"
                      />
                      <span className="text-white">🍗 Non-Veg</span>
                    </label>
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Item Image {editFormData.existingImageUrl && '(Optional - leave empty to keep current)'}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleEditImageChange}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-500 file:text-white file:cursor-pointer hover:file:bg-blue-600 transition-colors"
                  />
                  {editImagePreview && (
                    <div className="mt-4">
                      <p className="text-sm text-slate-400 mb-2">
                        {editFormData.image ? 'New Image Preview:' : 'Current Image:'}
                      </p>
                      <img
                        src={editImagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-xl border border-slate-700"
                      />
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditItemModal(false);
                      setEditImagePreview(null);
                    }}
                    className="flex-1 px-6 py-3 bg-slate-700/50 hover:bg-slate-700 rounded-xl font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25"
                  >
                    {isSubmitting ? 'Updating...' : 'Update Item'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm.show && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-2xl p-6 sm:p-8 max-w-md w-full border border-slate-700/50 shadow-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-red-500/10 rounded-full">
                  <Trash2 className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-white">Delete Item?</h3>
              </div>
              
              <p className="text-slate-300 mb-6">
                Are you sure you want to delete <span className="text-white font-semibold">"{deleteConfirm.itemName}"</span>? This action cannot be undone.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm({ show: false, itemId: null, itemName: '' })}
                  className="flex-1 px-6 py-3 bg-slate-700/50 hover:bg-slate-700 rounded-xl font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteItem(deleteConfirm.itemId)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl font-semibold transition-all shadow-lg shadow-red-500/25"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default OwnerDashboard;