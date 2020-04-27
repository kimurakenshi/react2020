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
  completed: boolean;
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
    getUpdateTaskSuccess: (state, action: PayloadAction<Task>) => {
      const taskToUpdate = state.tasks.find(
        (task) => task.id === action.payload.id
      );

      if (taskToUpdate) {
        taskToUpdate.name = action.payload.name;
        taskToUpdate.completed = action.payload.completed;
      }
    },
    getDeleteTaskSuccess: (state, action: PayloadAction<Task>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    },
  },
});

export const {
  getTasksSuccess,
  getTasksError,
  getCreateTaskSuccess,
  getUpdateTaskSuccess,
  getDeleteTaskSuccess,
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
    const task = await fetchJSON(API_ROUTES.TASK_CREATE, {
      method: 'POST',
      body: JSON.stringify({
        name,
      }),
    });
    dispatch(getCreateTaskSuccess(task));
    dispatch(
      setPageNotification({
        type: NotificationType.SUCCESS,
        message: `"${name}" was created successfully.`,
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

export const updateTaskStatus = (
  taskId: string,
  completed: boolean
): AppThunk => async (dispatch) => {
  try {
    const task = await fetchJSON(`${API_ROUTES.TASK}/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify({
        completed,
      }),
    });
    dispatch(getUpdateTaskSuccess(task));
  } catch (err) {
    dispatch(
      setPageNotification({
        type: NotificationType.ERROR,
        message: err.message,
      })
    );
  }
};

export const deleteTask = (taskId: string): AppThunk => async (dispatch) => {
  try {
    const task = await fetchJSON(`${API_ROUTES.TASK}/${taskId}`, {
      method: 'DELETE',
    });
    dispatch(getDeleteTaskSuccess(task));
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
