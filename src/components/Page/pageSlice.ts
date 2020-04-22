import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../App/rootReducer';

interface PageState {
  isFetching: boolean;
  error: string;
}

const initialState: PageState = {
  isFetching: false,
  error: '',
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setIsFetching: (state, action) => {
      state.isFetching = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setError, setIsFetching } = pageSlice.actions;

export const selectIsFetching = (state: RootState) => state.page.isFetching;
export const selectError = (state: RootState) => state.page.error;

export default pageSlice.reducer;
