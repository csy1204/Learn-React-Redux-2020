import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import createSagaMiddleware from "redux-saga";
import rootEffects from './saga'

import counterReducer from '../features/counter/counterSlice';
import todoReducer from '../features/todos/todoSlice';
import newsReducer from '../features/newsView/newsSlice';

const sagaMiddleware = createSagaMiddleware();

// 기존 createStore, combineReducers를 대체 
export default configureStore({
  reducer: {
    counter: counterReducer,
    todos: todoReducer,
    news: newsReducer,
  },
  middleware: [...getDefaultMiddleware(), sagaMiddleware]
});

sagaMiddleware.run(rootEffects);