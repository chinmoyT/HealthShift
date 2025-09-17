import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/authInterceptor";
import url from '../../Url'
import { toast } from "sonner";


const initialState = {
    users: [],
    loading: false,
    drawerLoading: false,
    userById: {},
    staff: [],
    staffById: {},
    error: null
}

export const getUserList = createAsyncThunk(
    'user/getUserList',
    async(_,{rejectWithValue})=> {
        try {
            const response = await axiosInstance.get(`${url}/api/um`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
)

export const getUserById = createAsyncThunk(
    'user/userById',
    async(userId, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get(`${url}/api/um/${userId}`);
            return response.data;
        } catch(err) {
            return rejectWithValue(err?.response?.data);
        }
    }
)

export const addUser = createAsyncThunk(
    'user/addUser',
    async(userDetails, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post(`${url}/api/um/register`, userDetails);
            if(response?.data?.status) {
                toast.success(response?.data?.jsonData);
            }
            return response.data;
        } catch(err) {
            toast.error(err?.response?.data?.errorMessage || "Failed to add user");
            return rejectWithValue(err?.response?.data);
        }
    }
)

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async(userDetails, {rejectWithValue})=> {
        try{
            const response = await axiosInstance.put(`${url}/api/um`, userDetails);
            if(response?.data?.status) {
                toast.success(response?.data?.jsonData);
            }
            return response.data;
        } catch(err) {
            toast.error(err?.response?.data?.errorMessage || "Failed to update user");
            return rejectWithValue(err?.response?.data)
        }
    }
)

export const deactivateUser = createAsyncThunk(
    'user/deactivateUser',
    async(userId, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.put(`${url}/api/um/deactivate/${userId}`);
            if(response?.data?.status) {
                toast.success(response?.data?.jsonData);
            }
            return response.data;
        } catch(err) {
            toast.error(err?.response?.data?.errorMessage || "Failed to delete user");
            return rejectWithValue(err?.response?.data);
        }
    }
)

export const getStaffProfileList = createAsyncThunk(
    '/user/staffList',
    async(_, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get(`${url}/api/um/staff`)
            return response.data;
        } catch(err) {
            return rejectWithValue(err?.response?.data)
        }
    }
)

export const getStaffProfileById = createAsyncThunk(
    'user/staffById',
    async(staffId, {rejectWithValue})=> {
        try{
            const response = await axiosInstance.get(`${url}/api/um/staff/${staffId}`)
            return response.data;
        } catch(err) {
            rejectWithValue(err.response.data)
        }
    }
)

export const updateStaff = createAsyncThunk(
    'update/staff',
    async(staffData, {rejectWithValue})=> {
        try {
            const response = await axiosInstance.put(`${url}/api/um/staff`, staffData)
            toast.success(response.data.jsonData)
            return response.data;
        } catch(err) {
            toast.error(err.response.data.errorMessage)
            rejectWithValue(err.response.data)
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUserById: (state)=> {
            state.userById = {}
        }
    },
    extraReducers: (builder)=> {
        builder
            //user list
            .addCase(getUserList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserList.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.data;
            })
            .addCase(getUserList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.errorMessage;
            })
            //user by id
            .addCase(getUserById.pending, (state)=> {
                state.loading = true;
                state.drawerLoading = true;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.drawerLoading = false;
                state.userById = action.payload.data;
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.errorMessage;
            })
            //add user
            .addCase(addUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload.data.user);
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.errorMessage;
            })
            //deactivate user
            .addCase(deactivateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deactivateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter(user => user.id !== action.payload.data.id);
            })
            .addCase(deactivateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.errorMessage;
            })
            //get staff list
            .addCase(getStaffProfileList.pending, (state)=> {
                state.loading = true;
            })
            .addCase(getStaffProfileList.fulfilled, (state, action)=> {
                state.loading = false;
                state.staff = action.payload.data
            })
            .addCase(getStaffProfileList.rejected, (state, action)=> {
                state.loading = false;
                state.error = action.payload.data;
            })
            //getStaff 
            .addCase(getStaffProfileById.pending, (state)=> {
                state.loading = true;
            })
            .addCase(getStaffProfileById.fulfilled, (state, action)=> {
                state.loading = false;
                state.staffById = action.payload?.data
            })
            .addCase(getStaffProfileById.rejected, (state, action)=> {
                state.loading = false;
                state.error = action.payload.data;
            })
    }
})

export const { clearUserById } = userSlice.actions;
export default userSlice.reducer;