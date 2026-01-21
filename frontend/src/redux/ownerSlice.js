import { createSlice } from "@reduxjs/toolkit";
const ownerSlice = createSlice({
    name:'owner',
    initialState:{
        myShopData:null,
    },
    reducers:{
        setShopData: (state,action)=>{
            state.myShopData = action.payload; 
        }
    }
})
export const {setShopData}= ownerSlice.actions;
export default ownerSlice.reducer;