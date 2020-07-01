import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import createSagaMiddleware from "redux-saga";
import rootEffects from './saga'

import counterReducer from '../features/counter/counterSlice';
import todoReducer from '../features/todos/todoSlice';

const sagaMiddleware = createSagaMiddleware();

// 기존 createStore, combineReducers를 대체 
export default configureStore({
  reducer: {
    counter: counterReducer,
    todos: todoReducer,
  },
  middleware: [...getDefaultMiddleware(), sagaMiddleware]
});

sagaMiddleware.run(rootEffects);