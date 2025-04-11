import { configureStore } from "@reduxjs/toolkit";
import AppSlice from './AppSlice';

const Store = configureStore({
      reducer:{
          app:AppSlice
      }
});

export default Store;
