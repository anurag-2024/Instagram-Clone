import {configureStore} from '@reduxjs/toolkit';
import todoReducer from './slices/authSlice';
import postReducer from './slices/postSlice';
import notificationReducer from './slices/notificationSlice';
export const store = configureStore({
    reducer:{
        auth:todoReducer,
        post:postReducer,
        notifications:notificationReducer
    }
});