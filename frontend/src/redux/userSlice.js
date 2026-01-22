import {createSlice} from '@reduxjs/toolkit';
const   userSlice = createSlice({
    name:'user',
    initialState:{
        userData:null,
        city:null,
        state:null,
        address:null,
 loading: true, 
    },

    reducers:{
        setUserData: (state, action) => {
  state.userData = action.payload;   // ✅ DIRECT ASSIGN
   state.loading = false; 
},
        setCity:(state,action)=>{
          state.city = action.payload;
             

        },
        setState:(state,action)=>{
          state.state = action.payload;
             

        },
        setAddress:(state,action)=>{
          state.address = action.payload;
             

        },



        clearUser: (state) => {
      state.userData = null;
       state.loading = false; 
    }
    }

})

export const {setUserData,setCity,clearUser,setState,setAddress}= userSlice.actions;
export default userSlice.reducer;