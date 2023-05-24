import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import filterReducer from "../redux/features/auth/filterSlice";
import formReducer from "./features/form/formSlice";
import formFilterReducer from "./features/form/formFilterSlice";
import EmployeeDetailsReducer from "./features/form/EmployeeDetailsSlice";
import categoryReducer from "./features/categories/categorySlice";
import resourceReducer from "./features/resources/resourceSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    filter: filterReducer,
    form: formReducer,
    formFilter: formFilterReducer,
    empDetails: EmployeeDetailsReducer,
    category: categoryReducer,
    resource: resourceReducer,
  },
});
