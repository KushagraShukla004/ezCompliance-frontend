import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emp_Details: {},
};

const EmployeeDetailsSlice = createSlice({
  name: "empDetails",
  initialState,
  reducers: {
    ADD_EMP_DETAILS: (state, action) => {
      console.log(`action.payload in ADD_EMP_DETAILS:`, action.payload);
      state.emp_Details = action.payload;
    },
  },
});
export const { ADD_EMP_DETAILS } = EmployeeDetailsSlice.actions;

export const selectEmpDetails = (state) => state.empDetails?.emp_Details;

export default EmployeeDetailsSlice.reducer;
