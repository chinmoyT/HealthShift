import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import url from '../../Url'
import axiosInstance from "../../utils/authInterceptor";
import { toast } from "sonner";

const initialState = {
    user: null,
    loading: false,
    error: null,
    token: null,
    userAccess: {}
}

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({email, password}, {rejectWithValue}) => {
        try{
            const response = await axios.post(`${url}/api/login`, {email, password});
            return response.data;
            
        }catch(error){
            toast.error(error?.response?.data?.errorMessage)
            return rejectWithValue(error?.response?.data);
        }
    }
)

export const userAccess = createAsyncThunk(
    'auth/access',
    async({role}, {rejectWithValue})=> {
        try{
            const response = await axiosInstance.get(`/api/access?role=${role}`);
            return response.data;
        }catch(err) {
            return rejectWithValue(err)
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.token = action.payload.jsonData;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.errorMessage;
            })
            //access
            .addCase(userAccess.pending, (state)=> {
                state.loading = true;
                state.error = null
            })
            .addCase(userAccess.fulfilled, (state, action)=> {
                state.loading = false
                state.access = action.payload.data || {}
            })
            .addCase(userAccess.rejected, (state, action)=> {
                state.loading = false
                state.error = action.payload.errorMessage
            })
    }
})

export default authSlice.reducer;