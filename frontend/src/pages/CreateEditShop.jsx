import React, { useState, useEffect } from 'react';
import { Upload, X, Plus, Trash2, Save, ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setShopData } from '../redux/ownerSlice';

import toast from 'react-hot-toast';

function CreateEditShop() {
  
  const { city, state, address } = useSelector((state) => state.user);
  console.log("CreateEditShop - User Data:", city, state, address);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { myShopData } = useSelector((state) => state.owner || {});
  
  // Determine if we're in edit mode
  const [isEditMode, setIsEditMode] = useState(false);
  
  const [shopData, setShopData] = useState({
    name: '',
    state: '',
    address: '',
    city: '',
    image: '',
  });
  const [imagePreview, setImagePreview] = useState('');
  const [items, setItems] = useState([]);
  const [showItemForm, setShowItemForm] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    name: '',
    image: '',
    category: '',
    price: '',
    foodType: '',
  });

  // State for delete confirmation modal
  const [deleteConfirm, setDeleteConfirm] = useState({
      show: false,
      itemId: null,
      fullItem: null
  });

  const categories = [
    'Snacks', 'Main Course', 'Desserts', 'Pizza', 'Burgers',
    'Sandwiches', 'South Indian', 'North Indian', 'Chinese',
    'Fast Food', 'Others'
  ];

  // Load existing shop data if editing
useEffect(() => {
  // 🟢 EDIT MODE → use shop data
  if (myShopData) {
    setIsEditMode(true);
    setShopData({
      name: myShopData.name || '',
      state: myShopData.state || '',
      address: myShopData.address || '',
      city: myShopData.city || '',
      image: myShopData.image || '',
    });
    setImagePreview(myShopData.image || '');
    setItems(myShopData.items || []);
    return;
  }

  // 🟢 CREATE MODE → auto-fill from Redux Geo
  setShopData(prev => ({
    ...prev,
    city: prev.city || city || '',
    state: prev.state || state || '',
    address: prev.address || address || '',
  }));

}, [myShopData, city, state, address]);


  const handleShopChange = (e) => {
    const { name, value } = e.target;
    setShopData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setShopData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem(prev => ({ ...prev, [name]: value }));
  };

  const handleItemImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentItem(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addItem = () => {
    if (currentItem.name && currentItem.category && currentItem.price && currentItem.foodType) {
      // setItems(prev => [...prev, { ...currentItem, id: Date.now() }]);

      setItems(prev => [...prev, { ...currentItem }]);

      setCurrentItem({
        name: '',
        image: '',
        category: '',
        price: '',
        foodType: '',
      });
      setShowItemForm(false);
    }
  };


  const triggerDelete = (id, item) => {
      setDeleteConfirm({
          show: true,
          itemId: id,
          fullItem: item
      });
  };

  const confirmDelete = async () => {
    const { itemId: id, fullItem: item } = deleteConfirm;
    
    // If item has _id, it is from DB -> delete from server
    if (item._id) {
       try {
         const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/item/delete/${item._id}`, {
            method: 'DELETE',
            credentials: 'include'
         });
         
         const data = await response.json();
         if(response.ok) {
             setItems(prev => prev.filter(i => i._id !== id));
             toast.success(data.message || "Item deleted");
         } else {
             toast.error(data.message || "Failed to delete item");
         }
       } catch (error) {
         console.error("Error deleting item:", error);
         toast.error("Error deleting item");
       }
    } else {
       // If no _id, it's a local unsaved item -> just remove from state
       setItems(prev => prev.filter(i => i.id !== id));
       toast.success("Item removed");
    }
    // Close modal
    setDeleteConfirm({ show: false, itemId: null, fullItem: null });
  };



  const handleSubmit = async () => {
    // Validate required fields
    if (!shopData.name || !shopData.city || !shopData.state || !shopData.address || !shopData.image) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      const formData = new FormData();
      
      // Add shop details
      formData.append('name', shopData.name);
      formData.append('city', shopData.city);
      formData.append('state', shopData.state);
      formData.append('address', shopData.address);
      
      // Convert base64 image to file if it's a new upload
      if (shopData.image && shopData.image.startsWith('data:image')) {
        const response = await fetch(shopData.image);
        const blob = await response.blob();
        const file = new File([blob], 'shop-image.jpg', { type: blob.type });
        formData.append('image', file);
      }
      
      // Add items as JSON string
      const itemsData = items.map(item => ({
        name: item.name,
        image: item.image,
        category: item.category,
        price: item.price,
        foodType: item.foodType,
      }));
      formData.append('items', JSON.stringify(itemsData));

      
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/shop/create-edit`, {
        method: 'POST',
        // 🔹 Important: send cookies (JWT) with the request
        credentials: 'include',
        body: formData,
      });

// 🟢 Check server status first
      /* 
      // PREVIOUS CODE (COMMENTED OUT)
      if (!response.ok) {
        throw new Error("Server error");
      }

      // 🟢 Try to read JSON safely (optional)
      let data = {};

      try {
        data = await response.json();
      } catch (err) {
        console.warn("Response is not JSON");
      }

      // 🟢 Treat HTTP OK as success
      if (response.ok) {
        const freshResponse = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/shop/getShop`,
          {
            credentials: 'include',
            cache: 'no-store' // 👈 important
          }
        );

        const freshData = await freshResponse.json();

        if (freshData.success) {
          // 1️⃣ Update Redux
          dispatch(setShopData(freshData.shop));

          // 2️⃣ Wait one tick then navigate
          setTimeout(() => {
            navigate('/');
          }, 0);
        }
      } else {
        alert(data.message || 'Something went wrong');
      }
      */

      // 🟢 NEW CODE
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Server error");
      }

      const data = await response.json();

      if (data.success) {
         // Attempt to refresh data, but don't block navigation on it
         try {
             const freshResponse = await fetch(
               `${import.meta.env.VITE_SERVER_URL}/api/shop/getShop`,
               {
                 credentials: 'include',
                 cache: 'no-store'
               }
             );
             if (freshResponse.ok) {
                 const freshData = await freshResponse.json();
                 if (freshData.success) {
                     dispatch(setShopData(freshData.shop));
                 }
             }
         } catch (refreshError) {
             console.warn("Failed to refresh shop data:", refreshError);
         }

         // Navigate regardless of refresh status
         setTimeout(() => {
             navigate('/');
         }, 0);
      } else {
         toast.error(data.message || 'Update failed');
      }

    } catch (error) {
      console.error('Error submitting shop:', error);
      toast.error('Failed to save shop. Please try again.');
    }
  };
  return (
    <div className="min-h-screen bg-[#0f172a] p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate('/')} 
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-slate-400" />
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            {isEditMode ? 'Edit Shop' : 'Create New Shop'}
          </h1>
        </div>

        <div className="space-y-6">
          {/* Shop Details Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-slate-700/50">
            <h2 className="text-xl font-semibold text-white mb-6">Shop Information</h2>
            
            {/* Image Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Shop Image *
              </label>
              <div className="flex items-start gap-4">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Shop preview"
                      className="w-32 h-32 object-cover rounded-lg border-2 border-slate-600"
                    />
                    <button
                      onClick={() => {
                        setImagePreview('');
                        setShopData(prev => ({ ...prev, image: '' }));
                      }}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ) : (
                  <label className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-slate-600 rounded-lg cursor-pointer hover:border-blue-500 transition-colors bg-slate-900/50">
                    <Upload className="w-8 h-8 text-slate-400 mb-2" />
                    <span className="text-xs text-slate-400">Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Shop Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={shopData.name}
                  onChange={handleShopChange}
                  className="w-full px-4 py-2.5 bg-slate-900/70 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter shop name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={shopData.city}
                  onChange={handleShopChange}
                  className="w-full px-4 py-2.5 bg-slate-900/70 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter city"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={shopData.state}
                  onChange={handleShopChange}
                  className="w-full px-4 py-2.5 bg-slate-900/70 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter state"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={shopData.address}
                  onChange={handleShopChange}
                  className="w-full px-4 py-2.5 bg-slate-900/70 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter full address"
                />
              </div>
            </div>
          </div>

          {/* Items Section */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-slate-700/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Menu Items</h2>
              <button
                onClick={() => setShowItemForm(!showItemForm)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Add Item
              </button>
            </div>

            {/* Add Item Form */}
            {showItemForm && (
              <div className="bg-slate-900/70 rounded-lg p-6 mb-6 border border-slate-700">
                <h3 className="text-lg font-medium text-white mb-4">New Menu Item</h3>
                
                {/* Item Image Upload */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Item Image
                  </label>
                  {currentItem.image ? (
                    <div className="relative inline-block">
                      <img
                        src={currentItem.image}
                        alt="Item preview"
                        className="w-24 h-24 object-cover rounded-lg border-2 border-slate-600"
                      />
                      <button
                        onClick={() => setCurrentItem(prev => ({ ...prev, image: '' }))}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full hover:bg-red-600"
                      >
                        <X className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  ) : (
                    <label className="inline-flex w-24 h-24 flex-col items-center justify-center border-2 border-dashed border-slate-600 rounded-lg cursor-pointer hover:border-blue-500 bg-slate-800/50">
                      <Upload className="w-6 h-6 text-slate-400" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleItemImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Item Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={currentItem.name}
                      onChange={handleItemChange}
                      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter item name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={currentItem.category}
                      onChange={handleItemChange}
                      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Price *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={currentItem.price}
                      onChange={handleItemChange}
                      min="0"
                      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter price"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Food Type *
                    </label>
                    <select
                      name="foodType"
                      value={currentItem.foodType}
                      onChange={handleItemChange}
                      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select type</option>
                      <option value="veg">Veg</option>
                      <option value="non veg">Non Veg</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={addItem}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    Add Item
                  </button>
                  <button
                    onClick={() => setShowItemForm(false)}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Items List */}
            <div className="space-y-3">
              {items.length === 0 ? (
                <p className="text-slate-400 text-center py-8">No items added yet</p>
              ) : (
                items.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-slate-900/70 rounded-lg border border-slate-700"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg border border-slate-600"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{item.name}</h4>
                      <div className="flex gap-4 mt-1 text-sm text-slate-400">
                        <span>{item.category}</span>
                        <span>₹{item.price}</span>
                        <span className={item.foodType === 'veg' ? 'text-green-400' : 'text-red-400'}>
                          {item.foodType === 'veg' ? '🟢 Veg' : '🔴 Non Veg'}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => triggerDelete(item._id || item.id, item)}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-4 pb-6">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg"
            >
              <Save className="w-5 h-5" />
              {isEditMode ? 'Update Shop' : 'Create Shop'}
            </button>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirm.show && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <div className="bg-slate-800 rounded-xl max-w-sm w-full p-6 border border-slate-700 shadow-2xl">
                    <h3 className="text-xl font-bold text-white mb-2">Delete Item?</h3>
                    <p className="text-slate-300 mb-6">
                        Are you sure you want to delete <span className="text-white font-medium">"{deleteConfirm.fullItem?.name}"</span>? 
                        This action cannot be undone.
                    </p>
                    <div className="flex gap-3 justify-end">
                        <button 
                            onClick={() => setDeleteConfirm({ show: false, itemId: null, fullItem: null })}
                            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={confirmDelete}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        )}

      </div>
    </div>
  );
}

export default CreateEditShop;