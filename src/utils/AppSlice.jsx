import { createSlice } from "@reduxjs/toolkit";

const AppSlice = createSlice({
    name:"app",
    initialState:{
      isSidebarVisible:false,
      video:[],
      category:"All"
    },
    reducers:{
        setSidebarVisibility:(state)=>{
            state.isSidebarVisible = !state.isSidebarVisible;
        },
        setVideo: (state,action) =>{
            state.video = action.payload;
        },
        setCatgeory:(state,action) =>{
            state.category = action.payload;
        } 
    }
});

export const {setSidebarVisibility,setVideo,setCatgeory} = AppSlice.actions;
export default AppSlice.reducer;

