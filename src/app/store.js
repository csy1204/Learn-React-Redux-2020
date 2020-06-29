import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import todoReducer from '../features/todos/todoSlice';

// 기존 createStore, combineReducers를 대체 
export default configureStore({
  reducer: {
    counter: counterReducer,
    todos: todoReducer,
  },
});
