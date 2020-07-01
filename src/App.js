import React from 'react';
import TodoInput from './features/todos/TodoInput';
import TodoList from './features/todos/TodoList';
import NewsList from './features/newsView/NewsList';

function App() {
  return (
    <div className="App">
      <TodoInput />
      <TodoList />
      <NewsList />
    </div>
  );
}

export default App;
