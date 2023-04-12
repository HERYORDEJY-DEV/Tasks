import { createSlice } from '@reduxjs/toolkit';
import { TasksStateType } from 'store/Types/tasks';

const tasksInitialState: TasksStateType = {
  lists: [
    { id: '0', title: 'Star' },
    { id: '1', title: 'My' },
  ],
  tasks: [],
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: tasksInitialState,
  reducers: {
    addNewList: (state, { payload }) => {
      state.lists = [...state.lists, payload];
    },

    addNewTask: (state, { payload }) => {
      state.tasks = [...state.tasks, payload];
    },

    updateTask: (state, { payload: { id, data } }) => {
      let tasks = [...state.tasks];
      const taskIndex = state.tasks.findIndex(task => task.id === id);
      tasks[taskIndex] = { ...data };

      state.tasks = [...tasks];
    },

    deleteList: (state, { payload: { id } }) => {
      const oldLists = [...state.lists];
      const newLists = oldLists.filter((list, index) => list.id !== id);

      state.lists = [...newLists];
    },

    deleteTask: (state, { payload: { id } }) => {
      const oldTasks = [...state.tasks];
      const newTasks = oldTasks.filter((task, index) => task.id !== id);

      state.tasks = [...newTasks];
    },
  },
});

export const { addNewList, addNewTask, deleteList, deleteTask, updateTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;
export const tasksReducer = tasksSlice.reducer;
