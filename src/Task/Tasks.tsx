import React, { useEffect } from 'react';
import { Page } from '../components';
import { fetchTasks, selectTasks } from './taskListSlice';
import { useDispatch, useSelector } from 'react-redux';

const Tasks = () => {
  const dispatch = useDispatch();
  const taskList = useSelector(selectTasks);

  useEffect(() => {
    dispatch(fetchTasks());
  });

  return (
    <Page>
      {' '}
      <h1>Tasks</h1>
      <ul>{taskList && taskList.map((task) => <li>{task.name}</li>)}</ul>
    </Page>
  );
};

export default Tasks;