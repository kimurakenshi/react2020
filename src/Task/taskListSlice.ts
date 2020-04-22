import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../App/store';
import { RootState } from '../App/rootReducer';
import { setIsFetching, setError } from '../components/Page/pageSlice';
import { fetchJSON } from '../core/data';

interface Task {
  id: string;
  isCompleted: boolean;
  name: string;
}

interface TaskListState {
  tasks: Task[];
}

const initialState: TaskListState = {
  tasks: [],
};

export const taskListSlice = createSlice({
  name: 'taskList',
  initialState,
  reducers: {
    getTasksSuccess: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    getTasksError: (state) => {
      state.tasks = [];
    },
  },
});

export const { getTasksSuccess, getTasksError } = taskListSlice.actions;

export const fetchTasks = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setIsFetching(true));
    const tasks = await fetchJSON();
    // @ts-ignore
    dispatch(getTasksSuccess(tasks));
    dispatch(setIsFetching(false));
  } catch (err) {
    dispatch(getTasksError());
    dispatch(setError(err.toString()));
  }
};

export const selectTasks = (state: RootState) => state.taskList.tasks;

export default taskListSlice.reducer;
