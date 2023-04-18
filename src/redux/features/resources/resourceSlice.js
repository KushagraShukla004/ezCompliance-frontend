import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import resourceService from './resourceService';
import { toast } from 'react-toastify';

const initialState = {
  resource: null,
  resources: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create New Form
export const createResource = createAsyncThunk(
  'resources/create',
  async (ResourceData, thunkAPI) => {
    try {
      return await resourceService.createResource(ResourceData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get all Resources
export const getAllResources = createAsyncThunk(
  'resources/getAllResources',
  async (_, thunkAPI) => {
    try {
      return await resourceService.getAllResources();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get all Resources of User
export const getAllUserResources = createAsyncThunk(
  'resources/getAllUserResources',
  async (_, thunkAPI) => {
    try {
      return await resourceService.getAllUserResources();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getResourceById = createAsyncThunk(
  'resources/getResourceById',
  async (res_id, thunkAPI) => {
    try {
      return await resourceService.getResourceById(res_id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const resourceSlice = createSlice({
  name: 'resource',
  initialState,
  reducers: {
    RESET(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createResource.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createResource.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(
          'createResource Resources (in extraReducers/action.payload)',
          action.payload
        );
        state.resources.push(action.payload);
        console.log(
          'createResource Resource (in extraReducers/state.forms): ',
          state.resources.push(action.payload)
        );
        toast.success('Resource created successfully');
      })
      .addCase(createResource.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export default resourceSlice.reducer;
