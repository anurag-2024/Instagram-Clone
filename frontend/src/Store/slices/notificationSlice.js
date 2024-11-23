import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const initialState = {
  notifications: [],
  loading: false,
}

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/getNotifications`,{
        headers:{
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      });
      return response.data.notifications;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
      state.loading = false;
    },
    addNotification: (state, action) => {
      const newNotification = action.payload;
      const exists = state.notifications.some(notif => 
        notif.id === newNotification.id || notif._id === newNotification._id
      );
      if (!exists) {
        state.notifications = [newNotification, ...state.notifications];
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload;
      state.loading = false;
    })
    .addCase(fetchNotifications.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })
  }
});

export const { 
  setNotifications, 
  addNotification, 
  setLoading, 
} = notificationSlice.actions;

export default notificationSlice.reducer;