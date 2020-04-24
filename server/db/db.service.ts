import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

// The db is an static JSON file. This should be replaced with a real DB implementation in the future.
const DB_FILE_PATH = './server/db/db.json';

const getDB = () => {
  try {
    const dbRawData = fs.readFileSync(DB_FILE_PATH);

    // @ts-ignore
    return JSON.parse(dbRawData);
  } catch (e) {
    throw new Error('There was an error while trying to read the DB.');
  }
};

const persistChanges = (data) => {
  try {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data));
  } catch (e) {
    throw new Error(
      'There was an error while trying to write changes into the DB.'
    );
  }
};

export const getTasks = (includeCompletedTasks?: boolean) => {
  const dbData = getDB();

  if (includeCompletedTasks === undefined) {
    return dbData;
  }

  return dbData.filter((task) => task.isCompleted === includeCompletedTasks);
};

export const createTask = (taskName: string) => {
  const dbData = getDB();

  if (!taskName) {
    throw new Error('A task name is required to create a new task.');
  }

  if (
    dbData.some((task) => task.name.toLowerCase() === taskName.toLowerCase())
  ) {
    throw new Error('There is a task created with the same name.');
  }

  const newTask = {
    name: taskName,
    isCompleted: false,
    id: uuidv4(),
  };

  dbData.push(newTask);

  persistChanges(dbData);

  return newTask;
};

export const updateTask = (taskId, taskInfo) => {
  const dbData = getDB();

  const taskToUpdate = dbData.find((task) => task.id === taskId);

  if (!taskToUpdate) {
    throw new Error("The task to update doesn't exist.");
  }

  taskToUpdate.name = taskInfo.name;
  taskToUpdate.isCompleted = taskInfo.isCompleted;

  persistChanges(dbData);

  return taskToUpdate;
};

export const deleteTask = (taskId: string) => {
  const dbData = getDB();

  const taskToDelete = dbData.find((task) => task.id === taskId);

  if (!taskToDelete) {
    throw new Error("The task to delete doesn't exist.");
  }

  persistChanges(dbData.filter((task) => task.id !== taskId));

  return taskToDelete;
};
