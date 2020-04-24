import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../App/rootReducer';

export enum NotificationType {
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
}

export interface IPageNotification {
  message: string;
  type: NotificationType;
}

interface PageState {
  isFetching: boolean;
  error: string;
  notification?: IPageNotification;
}

const initialState: PageState = {
  isFetching: false,
  error: '',
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    setPageNotification: (state, action: PayloadAction<IPageNotification>) => {
      state.notification = {
        type: action.payload.type,
        message: action.payload.message,
      };
    },
    resetPageNotification: (state) => {
      state.notification = undefined;
    },
  },
});

export const {
  setError,
  setIsFetching,
  setPageNotification,
  resetPageNotification,
} = pageSlice.actions;

export const selectIsFetching = (state: RootState) => state.page.isFetching;
export const selectError = (state: RootState) => state.page.error;
export const selectNotification = (state: RootState) => state.page.notification;

export default pageSlice.reducer;
