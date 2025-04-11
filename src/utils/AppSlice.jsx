import { createSlice } from "@reduxjs/toolkit";

const AppSlice = createSlice({
    name:"app",
    initialState:{
      isSidebarVisible:false,
      isDarkMode:false,
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
        },
        toggleDarkMode:(state) =>{
           state.isDarkMode = !state.isDarkMode;  
        } 
    }
});

export const {setSidebarVisibility,setVideo,setCatgeory,toggleDarkMode} = AppSlice.actions;
export default AppSlice.reducer;

