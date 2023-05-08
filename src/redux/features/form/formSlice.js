import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import formService from "./formService";
import categoryService from "../categories/categoryService";
import { toast } from "react-toastify";

const initialState = {
  form: null,
  forms: [],
  response: null,
  responses: [],
  category: null,
  categories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  TotalForms: 0,
  TotalUserResponses: 0,
  TotalCategories: 0,
};

// Create New Form
export const createForm = createAsyncThunk(
  "forms/create",
  async (formData, thunkAPI) => {
    console.log("formData in formSlice: ", formData);
    try {
      return await formService.createForm(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // console.log(message);
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
      // console.log(message);
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
      // console.log(message);
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
      // console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Delete a Form
export const deleteForm = createAsyncThunk(
  "forms/deleteForm",
  async (formId, thunkAPI) => {
    try {
      return await formService.deleteForm(formId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // console.log(message);
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
      // console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//submit Response
export const submitResponse = createAsyncThunk(
  "responses/submitResponse",
  async (responseData, thunkAPI) => {
    try {
      return await formService.submitResponse(responseData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // console.log(message);
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
      // console.log(message);
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
      // console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Create a Category
export const addCategory = createAsyncThunk(
  "categories/add",
  async (CategoryData, thunkAPI) => {
    try {
      return await categoryService.addCategory(CategoryData);
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
// Create a Category
export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async (_, thunkAPI) => {
    try {
      return await categoryService.getAllCategories();
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
// Create a Category
export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (cat_id, thunkAPI) => {
    console.log("cat_Id in FormSlice: ", cat_id);
    try {
      return await categoryService.deleteCategory(cat_id);
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
// Create a Category
export const editCategory = createAsyncThunk(
  "categories/edit",
  async (UpdatedCategoryData, thunkAPI) => {
    try {
      return await categoryService.editCategory(UpdatedCategoryData);
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
    CALC_TOTAL_FORMS(state, action) {
      const array = [];
      state.forms.map((form) => {
        return array.push(form);
      });
      let count = 0;
      array.forEach((item) => {
        if (item === true) {
          count += 1;
        }
      });

      state.TotalForms = count;
      console.log("state.TotalForms: ", state.TotalForms);
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
        // console.log(
        //   'createForm forms (in extraReducers/action.payload)',
        //   action.payload
        // );
        state.forms.push(action.payload);
        // console.log(
        //   'createForm forms (in extraReducers/state.forms): ',
        //   state.forms.push(action.payload)
        // );
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
        // console.log('allForms:', action.payload);
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
        // console.log('getFormById action.payload(in formSlice)', action.payload);
        state.form = action.payload;
        // console.log('state.form (in extraReducers/form): ', state.form);
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
        // console.log(
        //   'Responses action.payload(in state.responses): ',
        //   action.payload
        // );
        state.responses.push(action.payload);
        // console.log(
        //   'state.responses (in extraReducers/reponses): ',
        //   state.responses
        // );
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
        // console.log(
        //   `responses action.payload (in getAllResponseForms formSlice) :`,
        //   action.payload
        // );
      })
      .addCase(getAllResponseForms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // console.log(`message (in getAllResponseForms):`, state.message);
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
        // console.log('response: ', action.payload);
        state.response = action.payload;
        // console.log(
        //   'state.response (in extraReducers/response): ',
        //   state.response
        // );
      })
      .addCase(getResponse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // Create Category
      .addCase(addCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.categories.push(action.payload);
        toast.success("Category added Successful");
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      //Get all Categories
      .addCase(getAllCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // Edit Category
      .addCase(editCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.category = action.payload;
        toast.success("Category Updated");
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // Delete Category
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success("Category deleted successfully");
      })
      .addCase(deleteCategory.rejected, (state, action) => {
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
