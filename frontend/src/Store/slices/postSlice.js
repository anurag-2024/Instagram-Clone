import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import toast from 'react-hot-toast';
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const initialState = {
    posts: [],
    userPosts: [],
    post: {},
    loading: false,
    error: null,
    likedPosts:[],
    pagination:{},
    initialPostLoading:false,
    userPostsLoading:false
};

export const createPost = createAsyncThunk(
    "post/createPost",
    async (data, { rejectWithValue }) => {
        try {
            const token = Cookies.get('token');
            const res = await axios.post(`${BASE_URL}/create`, data, {
                headers: {
                    authorization: `Bearer ${token}`,
                    "Content-type": "Application/json"
                }
            });
            if (res.status === 200) {
                return res.data;
            }
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getAllPosts = createAsyncThunk(
    "post/getAllPosts",
    async ({page,limit},{ rejectWithValue }) => {
        try {
            const res = await axios.get(`${BASE_URL}/getAllPosts?page=${page}&limit=${limit}`);
            if (res.status === 200) {
                return res.data;
            }
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);


export const getLikedPosts = createAsyncThunk(
    "post/getLikedPosts",
    async (_,{ rejectWithValue }) => {
        try {
            const token = Cookies.get('token');
            const res = await axios.get(`${BASE_URL}/likedPosts`,{
                headers:{authorization: `Bearer ${token}`}
            });
            if (res.status === 200) {
                return res.data;
            }
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
)

export const getPost = createAsyncThunk(
    "post/getPost",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${BASE_URL}/getPost/${id}`);
            if (res.status === 200) {
                return res.data;
            }
        } catch (err) {
            return rejectWithValue(err.response.data);
        }  
    }
);

export const likePost = createAsyncThunk(
    "post/likePost",
    async (id, { rejectWithValue }) => {
        try {
            const token = Cookies.get('token');
            const res = await axios.post(`${BASE_URL}/likePost/${id}`, {}, {
                headers: { authorization: `Bearer ${token}` }
            });
            if (res.status === 200) {
                return res.data;
            }
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const unlikePost = createAsyncThunk(
    "post/unlikePost",
    async (id, { rejectWithValue }) => {
        try {
            const token = Cookies.get('token');
            const res = await axios.post(`${BASE_URL}/unlikePost/${id}`, {}, {
                headers: { authorization: `Bearer ${token}` }
            });
            if (res.status === 200) {
                return res.data;
            }
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const commentPost = createAsyncThunk(
    "post/commentPost",
    async (data, { rejectWithValue }) => {
        try {
            const token = Cookies.get('token');
            const res = await axios.post(`${BASE_URL}/commentPost/${data.postId}`, data, {
                headers: { authorization: `Bearer ${token}` }
            });
            if (res.status === 200) {
                return res.data;
            }
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteComment = createAsyncThunk(
    "post/deleteComment",
    async (data, { rejectWithValue }) => {
        try {
            const token = Cookies.get('token');
            const res = await axios.post(`${BASE_URL}/deleteComment/${data.postId}/${data.commentId}`, {}, {
                headers: { authorization: `Bearer ${token}` }
            });
            if (res.status === 200) {
                return res.data;
            }
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deletePost = createAsyncThunk(
    "post/deletePost",
    async (id, { rejectWithValue }) => {
        try {
            const token = Cookies.get('token');
            const res = await axios.delete(`${BASE_URL}/deletePost/${id}`, {
                headers: { authorization: `Bearer ${token}` }
            });
            if (res.status === 200) {
                return res.data;
            }
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);


export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setPost: (state, action) => {
            state.post = action.payload;
        },
        clearPost: (state) => {
            state.post = {};
        },
        clearUserPosts: (state) => {
            state.userPosts = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            .addCase(getAllPosts.pending, (state) => {
                state.initialPostLoading = true;
                state.error = null;
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.initialPostLoading = action.payload?.pagination?.currentPage === 1 ? false : true;
                state.error = null;
                state.posts = action.payload?.pagination?.currentPage === 1 ? action.payload?.posts : [...state.posts,...action.payload?.posts];
                state.pagination = action.payload?.pagination;
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.initialPostLoading = false;
                state.error = action.payload?.message;
            })
            
            .addCase(getPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPost.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.post = action.payload;
            })
            .addCase(getPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            .addCase(likePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(likePost.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(likePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            .addCase(unlikePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(unlikePost.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(unlikePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            .addCase(commentPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(commentPost.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(commentPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
                toast.error(action.payload?.message);
            })

            .addCase(deleteComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            .addCase(deletePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            .addCase(getLikedPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getLikedPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.likedPosts = action.payload;
            })
            .addCase(getLikedPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })
    }
});

export const { clearError, setPost, clearPost, clearUserPosts } = postSlice.actions;
export default postSlice.reducer;