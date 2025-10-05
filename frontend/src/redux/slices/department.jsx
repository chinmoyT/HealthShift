import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/authInterceptor";
import url from "../../Url";

const initialState = {
    allData: {},
    loading: false
}

export const getDepartments = createAsyncThunk(
    'dept/getList',
    async(_, {rejectWithValue})=> {
        try{
            const response = await axiosInstance.get(`${url}/api/dept`);
            return response?.data
        } catch(err) {
            return rejectWithValue(err?.response?.data)
        }
    }
)

export const getDepartmentById = createAsyncThunk(
    'dept/getDept',
    async(deptId, {rejectWithValue}) => {
        try{
            const response = await axiosInstance.get(`${url}/api/dept/${deptId}`)
            return response.data;
        } catch(err) {
            return rejectWithValue(err.response.data)
        }
    }
)

const departmentSlice = createSlice({
    name: 'dept',
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder
            .addCase(getDepartments.pending, (state)=> {
                state.loading = true;
            })
            .addCase(getDepartments.fulfilled, (state, action)=> {
                state.loading = false;
                state.allData = action.payload.data
            })
            .addCase(getDepartments.rejected, (state)=> {
                state.loading = false;
            })
            //get by id
            .addCase(getDepartmentById.pending, (state)=> {
                state.loading = true;
            })
            .addCase(getDepartmentById.fulfilled, (state, action)=> {
                state.loading = false;
                state.allData = action.payload.data
            })
            .addCase(getDepartmentById.rejected, (state)=> {
                state.loading = false;
            })
    }
})

export default departmentSlice.reducer;