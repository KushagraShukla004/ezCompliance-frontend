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
  // category: [],
};

// Create New Resource
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
      // Create
      .addCase(createResource.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createResource.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        // console.log(`action.payload :`, action.payload);
        state.resources.push(action.payload);
        // console.log(`resource resourceSlice :`, state.resource);
        toast.success('Reasource added Successful');
        // console.log('Registration payload', action.payload);
      })
      .addCase(createResource.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      //Get all Resources
      .addCase(getAllResources.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllResources.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.resources = action.payload;
      })
      .addCase(getAllResources.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      //Get all Resource of User
      .addCase(getAllUserResources.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUserResources.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.resources = action.payload;
        // console.log(
        //   'getAllUserResources Resource (in extraReducers/state.Resources): ',
        //   state.resources.push(action.payload)
        // );
      })
      .addCase(getAllUserResources.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      //Get a Resource by that Resource's ID
      .addCase(getResourceById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getResourceById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.resource = action.payload;
        // console.log(
        //   'getResourceById Resource (in extraReducers/state.Resources): ',
        //   state.resource.push(action.payload)
        // );
      })
      .addCase(getResourceById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { RESET } = resourceSlice.actions;

export const selectIsLoading = (state) => state.resource.isLoading;
export const selectResource = (state) => state.resource?.resource;
export const selectResources = (state) => state.resource?.resources;

export default resourceSlice.reducer;
