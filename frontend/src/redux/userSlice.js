import {createSlice} from '@reduxjs/toolkit';
const   userSlice = createSlice({
    name:'user',
    initialState:{
        userData:null,
        city:null,

    },

    reducers:{
        setUserData: (state, action) => {
  state.userData = action.payload;   // ✅ DIRECT ASSIGN
},
        setCity:(state,action)=>{
          state.city = action.payload;
             

        },
        clearUser: (state) => {
      state.userData = null;
    }
    }

})

export const {setUserData,setCity,clearUser}= userSlice.actions;
export default userSlice.reducer;