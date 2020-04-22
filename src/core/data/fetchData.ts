export const fetchJSON = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockedTasks), 2000);
  });
};

const mockedTasks = [
  { id: 1, name: 'Task 1', isCompleted: false },
  { id: 2, name: 'Task 2', isCompleted: true },
];
