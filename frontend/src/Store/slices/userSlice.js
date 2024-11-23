import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    user: null,
    loading: false,
    error: null,
}

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

export const getUser = createAsyncThunk(
    "user/getUser",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${BASE_URL}/user/${id}`);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        builder.addCase(getUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;