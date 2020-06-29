import React from 'react';
import TodoInput from './features/todos/TodoInput';
import TodoList from './features/todos/TodoList';

function App() {
  return (
    <div className="App">
      <TodoInput />
      <TodoList />
    </div>
  );
}

export default App;
