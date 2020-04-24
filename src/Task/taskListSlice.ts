import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../App/store';
import { RootState } from '../App/rootReducer';
import { setIsFetching, setError } from '../components/Page/pageSlice';
import { fetchJSON } from '../core/data';
import { API_ROUTES } from '../core/data';

interface Task {
  id: string;
  isCompleted: boolean;
  name: string;
}

interface TaskListState {
  tasks: Task[];
  hasCreationError: boolean;
}

const initialState: TaskListState = {
  tasks: [],
  hasCreationError: false,
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
    getCreateTaskSuccess: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    getHasCreateTaskError: (state, action: PayloadAction<boolean>) => {
      state.hasCreationError = action.payload;
    },
  },
});

export const {
  getTasksSuccess,
  getTasksError,
  getCreateTaskSuccess,
  getHasCreateTaskError,
} = taskListSlice.actions;

export const fetchTasks = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setIsFetching(true));
    const tasks = await fetchJSON(API_ROUTES.TASK_LIST, {
      method: 'POST',
    });
    // @ts-ignore
    dispatch(getTasksSuccess(tasks));
    dispatch(setIsFetching(false));
  } catch (err) {
    dispatch(getTasksError());
    dispatch(setError(err.toString()));
  }
};

export const createTask = (name: string): AppThunk => async (dispatch) => {
  try {
    const tasks = await fetchJSON(API_ROUTES.TASK_CREATE, {
      method: 'POST',
      body: JSON.stringify({
        name,
      }),
    });
    dispatch(getCreateTaskSuccess(tasks));
  } catch (err) {
    dispatch(getHasCreateTaskError(true));
  }
};

export const selectTasks = (state: RootState) => state.taskList.tasks;
export const selectHasCreationError = (state: RootState) =>
  state.taskList.hasCreationError;

export default taskListSlice.reducer;
