import { createSlice } from "@reduxjs/toolkit";


const initialState={
    username: "",
    fullName: "",
    email:"",
    mobile:"",
}
export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.username=action.payload.username;
            state.fullName=action.payload.fullName;
        },
        setEmail:(state,action)=>{
            state.email=action.payload.email;
        },
        setMobile:(state,action)=>{
            state.mobile=action.payload.mobile;
        
        }
    }
});

export const {login,setEmail,setMobile}=todoSlice.actions;

export default todoSlice.reducer;