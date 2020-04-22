import { combineReducers } from '@reduxjs/toolkit';
import pageReducer from '../components/Page/pageSlice';
import taskListReducer from '../Task/taskListSlice';

const rootReducer = combineReducers({
  page: pageReducer,
  taskList: taskListReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
