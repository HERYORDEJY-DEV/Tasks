import { combineReducers } from '@reduxjs/toolkit';
import { tasksReducer as tasks } from './tasks';

export const reducer = combineReducers({
  tasks,
});
