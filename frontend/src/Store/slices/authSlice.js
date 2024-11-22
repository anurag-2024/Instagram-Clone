import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
console.log(BASE_URL,API_KEY);
const initialState = {
    user: null,
    loading: false,
    error: null,
    resetEmail: null,
    resetMobile: null,
}

export const loginUser = createAsyncThunk(
    "auth/login",
    async ({ username, email, mobile, password }, { rejectWithValue }) => {
        try {
            console.log(BASE_URL);
            const res = await axios.post(`${BASE_URL}/login`, { 
                username, 
                password, 
                email, 
                mobile 
            });
            if (res.status === 200) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                Cookies.set('token', res.data.token, { expires: 1 });
                Cookies.set('user', JSON.stringify(res.data.user), { expires: 1 });
                return res.data;
            }
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getUser=createAsyncThunk("auth/getUser",async()=>{
    const res=await axios.get(`${BASE_URL}/user/getuser`);
    return res.data;
});

export const registerUser = createAsyncThunk(
    "auth/register",
    async ({ username, email, mobile, password, fullName }, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${BASE_URL}/register`, { 
                username, 
                password, 
                fullName,
                email, 
                mobile 
            });
            if (res.status === 201) {
                return res.data;
            }
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const verifyOTP = createAsyncThunk(
    "auth/verifyOTP",
    async (otp, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${BASE_URL}/verifyOTP`, { 
                params: { otp } 
            });
            if (res.status === 200) {
                return res.data;
            }
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const generateOTP = createAsyncThunk(
    "auth/generateOTP",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${BASE_URL}/generateOTP`);
            if (res.status === 201) {
                return res.data;
            }
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const sendOTPEmail = createAsyncThunk(
    "auth/sendOTPEmail",
    async ({ email, otp }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/registerMail`, {
                email: encodeURIComponent(email),
                subject: "Reset Password OTP",
                username: "User",
                otp
            });
            if (response.status === 200) {
                return response.data;
            }
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const verifyMobile = createAsyncThunk(
    "auth/verifyMobile",
    async ({ mobile, otp }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/verifyMobile`, { mobile });
            if (response.status === 200) {
                const encodedParams = new URLSearchParams();
                encodedParams.set('to', `+91${mobile}`);
                encodedParams.set('p', `${API_KEY}`);
                encodedParams.set('text', 'Your OTP is ' + otp);
                
                const options = {
                    method: 'POST',
                    url: 'https://sms77io.p.rapidapi.com/sms',
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        'X-RapidAPI-Key': '7658cc4c99msh4863d21e362a711p15cabcjsn82b6d3083eea',
                        'X-RapidAPI-Host': 'sms77io.p.rapidapi.com'
                    },
                    data: encodedParams,
                };
                
                const smsResponse = await axios.request(options);
                return smsResponse.data;
            }
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async ({ password, email, mobile }, { rejectWithValue }) => {
        try {
            const res = await axios.put(`${BASE_URL}/resetPassword`, { 
                password,
                email,
                mobile 
            });
            if (res.status === 200) {
                return res.data;
            }
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.user = null;
            Cookies.remove('token');
        },
        setResetEmail: (state, action) => {
            state.resetEmail = action.payload.email;
        },
        setResetMobile: (state, action) => {
            state.resetMobile = action.payload.mobile;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(verifyOTP.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOTP.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(verifyOTP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(generateOTP.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(generateOTP.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(generateOTP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })
            .addCase(sendOTPEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendOTPEmail.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(sendOTPEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })
            .addCase(verifyMobile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyMobile.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(verifyMobile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
                state.resetEmail = null;
                state.resetMobile = null;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            });
    }
});

export const { setUser, logout, setResetEmail, setResetMobile } = authSlice.actions;
export default authSlice.reducer;