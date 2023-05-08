// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import categoryService from './categoryService';
// import { toast } from 'react-toastify';

// const initialState = {
//   category: null,
//   categories: [],
//   isError: false,
//   isSuccess: false,
//   isLoading: false,
//   message: '',
// };

// // Create a Category
// export const addCategory = createAsyncThunk(
//   'categories/add',
//   async (CategoryData, thunkAPI) => {
//     try {
//       return await categoryService.addCategory(CategoryData);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );
// // Create a Category
// export const getAllCategories = createAsyncThunk(
//   'categories/getAllCategories',
//   async (_, thunkAPI) => {
//     try {
//       return await categoryService.getAllCategories();
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );
// // Create a Category
// export const deleteCategory = createAsyncThunk(
//   'categories/delete',
//   async (cat_Id, thunkAPI) => {
//     try {
//       return await categoryService.deleteCategory(cat_Id);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );
// // Create a Category
// export const editCategory = createAsyncThunk(
//   'categories/edit',
//   async (UpdatedCategoryData, thunkAPI) => {
//     try {
//       return await categoryService.editCategory(UpdatedCategoryData);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// const categorySlice = createSlice({
//   name: 'category',
//   initialState,
//   reducers: {
//     RESET(state) {
//       state.isError = false;
//       state.isSuccess = false;
//       state.isLoading = false;
//       state.message = '';
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Create Category
//       .addCase(addCategory.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(addCategory.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.isLoggedIn = true;
//         console.log(`action.payload :`, action.payload);
//         state.category = action.payload;
//         console.log(`categories  :`, state.category);
//         toast.success('Category added Successful');
//         // console.log('Registration payload', action.payload);
//       })
//       .addCase(addCategory.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//         toast.error(action.payload);
//       })
//       //Get all Categories
//       .addCase(getAllCategories.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getAllCategories.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.isError = false;
//         state.categories = action.payload;
//       })
//       .addCase(getAllCategories.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//         toast.error(action.payload);
//       })
//       // Edit Category
//       .addCase(editCategory.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(editCategory.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.category = action.payload;
//         toast.success('Category Updated');
//       })
//       .addCase(editCategory.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//         toast.error(action.payload);
//       })
//       // Delete Category
//       .addCase(deleteCategory.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(deleteCategory.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.message = action.payload;
//         toast.success(action.payload);
//       })
//       .addCase(deleteCategory.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//         toast.error(action.payload);
//       });
//   },
// });

// export const { RESET } = categorySlice.actions;

// export const selectIsLoading = (state) => state.category.isLoading;
// export const selectCategory = (state) => state.category?.category;
// export const selectCategories = (state) => state.category?.categories;

// export default categorySlice.reducer;
