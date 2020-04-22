import { combineReducers } from '@reduxjs/toolkit';
import pageReducer from '../components/Page/pageSlice';
import counterReducer from '../features/counter/counterSlice';

const rootReducer = combineReducers({
  page: pageReducer,
  counter: counterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
