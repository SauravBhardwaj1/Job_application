import { configureStore } from "@reduxjs/toolkit";
import jobReducer from ""
import authReducer from ""
import userReducer from ""

const store = configureStore({
    reducer:{
        auth:authReducer,
        user:userReducer,
        job:jobReducer
    }
    

})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;
