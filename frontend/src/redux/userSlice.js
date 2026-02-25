// import {createSlice} from '@reduxjs/toolkit';
// const   userSlice = createSlice({
//     name:'user',
//     initialState:{
//         userData:null,
//         city:null,
//         state:null,
//         address:null,
//  loading: true, 





//     },

//     reducers:{
//         setUserData: (state, action) => {
//   state.userData = action.payload;   // ✅ DIRECT ASSIGN
//    state.loading = false; 
// },
//         setCity:(state,action)=>{
//           state.city = action.payload;
             

//         },
//         setState:(state,action)=>{
//           state.state = action.payload;
             

//         },
//         setAddress:(state,action)=>{
//           state.address = action.payload;
             

//         },



//         clearUser: (state) => {
//       state.userData = null;
//        state.loading = false; 
//     }
//     }

// })

// export const {setUserData,setCity,clearUser,setState,setAddress}= userSlice.actions;
// export default userSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    // 👤 User Data
    userData: null,
    loading: true,
    
    // 📍 Location Data
    city: null,
    state: null,
    address: null,
    
    // 🏪 Shops Cache (by city)
    shopsByCity: {},      // { "Bangalore": [shop1, shop2], "Mumbai": [...] }
    shopsLoading: false,  // Loading state for shops fetch
    shopsError: null,     // Error message for shops fetch
  },

  reducers: {
    // 👤 User Actions
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.loading = false;
    },
    
    clearUser: (state) => {
      state.userData = null;
      state.city = null;
      state.state = null;
      state.address = null;
      state.loading = false;
      // Clear shops cache on logout
      state.shopsByCity = {};
      state.shopsError = null;
    },

    // 📍 Location Actions
    setCity: (state, action) => {
      state.city = action.payload;
    },
    
    setState: (state, action) => {
      state.state = action.payload;
    },
    
    setAddress: (state, action) => {
      state.address = action.payload;
    },

    // 🏪 Shops Actions
    setShopsByCity: (state, action) => {
      const { city, shops } = action.payload;
      // Cache shops under the city key
      state.shopsByCity[city] = shops;
      state.shopsLoading = false;
      state.shopsError = null;
    },
    
    setShopsLoading: (state, action) => {
      state.shopsLoading = action.payload;
    },
    
    setShopsError: (state, action) => {
      state.shopsError = action.payload;
      state.shopsLoading = false;
    },
    
    clearShopsCache: (state, action) => {
      const city = action.payload;
      if (city) {
        // Clear cache for specific city only
        delete state.shopsByCity[city];
      } else {
        // Clear all shops cache
        state.shopsByCity = {};
      }
      state.shopsError = null;
    },
  },
});

// ✅ Export all actions
export const {
  // User
  setUserData,
  clearUser,
  
  // Location
  setCity,
  setState,
  setAddress,
  
  // Shops
  setShopsByCity,
  setShopsLoading,
  setShopsError,
  clearShopsCache,
} = userSlice.actions;

export default userSlice.reducer;