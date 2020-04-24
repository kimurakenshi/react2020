import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../App/store';
import { RootState } from '../App/rootReducer';
import {
  setIsFetching,
  setError,
  setPageNotification,
  NotificationType,
} from '../components/Page/pageSlice';
import { fetchJSON } from '../core/data';
import { API_ROUTES } from '../core/data';

interface Task {
  id: string;
  isCompleted: boolean;
  name: string;
}

interface TaskManagerState {
  tasks: Task[];
}

const initialState: TaskManagerState = {
  tasks: [],
};

export const taskManagerSlice = createSlice({
  name: 'taskManager',
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
  },
});

export const {
  getTasksSuccess,
  getTasksError,
  getCreateTaskSuccess,
} = taskManagerSlice.actions;

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
    dispatch(
      setPageNotification({
        type: NotificationType.SUCCESS,
        message: `${name} was created successfully.`,
      })
    );
  } catch (err) {
    dispatch(
      setPageNotification({
        type: NotificationType.ERROR,
        message: err.message,
      })
    );
  }
};

export const selectTasks = (state: RootState) => state.taskManager.tasks;

export default taskManagerSlice.reducer;
