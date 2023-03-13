import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filteredForms: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    FILTER_FORMS(state, action) {
      const { forms, search } = action.payload;
      const tempForms = forms?.filter((form) =>
        form?.title.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredForms = tempForms;
    },
  },
});

export const { FILTER_FORMS } = filterSlice.actions;

export const selectFilteredForms = (state) => state.filter?.filteredForms;

export default filterSlice.reducer;
