import { combineReducers } from '@reduxjs/toolkit';
import pageReducer from '../components/Page/pageSlice';
import taskManagerReducer from '../Task/taskManagerSlice';

const rootReducer = combineReducers({
  page: pageReducer,
  taskManager: taskManagerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
