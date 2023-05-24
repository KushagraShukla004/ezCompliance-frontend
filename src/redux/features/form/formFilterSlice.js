import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredForms: [],
};

const formFilterSlice = createSlice({
  name: "formFilter",
  initialState,
  reducers: {
    FILTER_FORMS(state, action) {
      const { forms, search } = action.payload;
      const tempForms = forms?.filter(
        (form) =>
          form?.createdBy?.name.toLowerCase().includes(search.toLowerCase()) ||
          form?.category?.toLowerCase().includes(search.toLowerCase()) ||
          form?.createdAt?.slice(0, 10).includes(search.toLowerCase())
      );
      state.filteredForms = tempForms;
    },
    FILTER_FORMS_CATEGORY(state, action) {
      const { forms, category, search } = action.payload;
      const tempForms = forms?.filter(
        (form) =>
          form?.category?.toLowerCase().includes(category.toLowerCase()) ||
          form?.createdBy?.name
            .toLowerCase()
            .includes(search?.toLowerCase() && category?.toLowerCase()) ||
          form?.createdAt
            ?.slice(0, 10)
            .includes(search?.toLowerCase() && category?.toLowerCase())
      );
      state.filteredForms = tempForms;
    },
  },
});

export const { FILTER_FORMS, FILTER_FORMS_CATEGORY } = formFilterSlice.actions;

export const selectFilteredForms = (state) => state.formFilter?.filteredForms;

export default formFilterSlice.reducer;
