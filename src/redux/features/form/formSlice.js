import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import formService from "./formService";
import { toast } from "react-toastify";

const initialState = {
  form: null,
  forms: [],
  response: null,
  responses: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create New Form
export const createForm = createAsyncThunk(
  "forms/create",
  async (formData, thunkAPI) => {
    // console.log("formData in formSlice: ", formData);
    try {
      return await formService.createForm(formData);
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
//get all Forms
export const getAllForms = createAsyncThunk(
  "forms/getAllForms",
  async (_, thunkAPI) => {
    try {
      return await formService.getAllForms();
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

//get all Forms
export const getAllFormsofUser = createAsyncThunk(
  "forms/getAllFormsofUser",
  async (_, thunkAPI) => {
    try {
      return await formService.getAllFormsofUser();
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

// Get a form
export const getFormById = createAsyncThunk(
  "forms/getFormById",
  async (formId, thunkAPI) => {
    try {
      return await formService.getFormById(formId);
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

//Delete a Form
export const deleteForm = createAsyncThunk(
  "forms/deleteForm",
  async (formId, thunkAPI) => {
    console.log(`formId in formSlice:`, formId);
    try {
      return await formService.deleteForm(formId);
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

//Edit a form
export const editForm = createAsyncThunk(
  "forms/editForm",
  async ({ formId, formData }, thunkAPI) => {
    try {
      return await formService.editForm(formId, formData);
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

//submit Response
export const submitResponse = createAsyncThunk(
  "responses/submitResponse",
  async (responseData, thunkAPI) => {
    console.log(`responseData in formSlice:`, responseData);
    try {
      return await formService.submitResponse(responseData);
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

//get all Responses of the user
export const getAllResponseForms = createAsyncThunk(
  "responses/getAllResponseForms",
  async (_, thunkAPI) => {
    try {
      return await formService.getAllResponseForms();
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

//getResponse
export const getResponse = createAsyncThunk(
  "responses/getResponse",
  async (formId, thunkAPI) => {
    try {
      return await formService.getResponse(formId);
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

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    RESET(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      //Create a Form
      .addCase(createForm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createForm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.forms.push(action.payload);
        toast.success("Form created successfully");
      })
      .addCase(createForm.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      //Get all Forms
      .addCase(getAllForms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllForms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.forms = action.payload;
      })
      .addCase(getAllForms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      //Get all Forms of User
      .addCase(getAllFormsofUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllFormsofUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // console.log('forms:', action.payload);
        state.forms = action.payload;
      })
      .addCase(getAllFormsofUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      //Get a Form by that form's ID
      .addCase(getFormById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFormById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.form = action.payload;
      })
      .addCase(getFormById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      //Delete a form
      .addCase(deleteForm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteForm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Form deleted successfully");
      })
      .addCase(deleteForm.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      //Edit Form
      .addCase(editForm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editForm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Form edited successfully");
      })
      .addCase(editForm.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      //Submit a Response
      .addCase(submitResponse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitResponse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.responses.push(action.payload);
        toast.success("Response submitted successfully");
      })
      .addCase(submitResponse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      //getallResponses
      .addCase(getAllResponseForms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllResponseForms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.responses = action.payload;
      })
      .addCase(getAllResponseForms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      //Get a Form by that form's ID
      .addCase(getResponse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getResponse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.response = action.payload;
      })
      .addCase(getResponse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { RESET } = formSlice.actions;

export const selectIsLoading = (state) => state.form.isLoading;
export const selectForm = (state) => state.form.form;
export const selectForms = (state) => state.form.forms;
export const selectResponse = (state) => state.form.response;
export const selectResponses = (state) => state.form.responses;

export default formSlice.reducer;
