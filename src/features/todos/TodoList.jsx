import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'
import { removeTodo, toggleTodo } from './todoSlice'
import { useDispatch, useSelector } from 'react-redux'

const TodoList = () => {
    const todos = useSelector((store) => store.todos);
    const dispatch = useDispatch();

    return(
        <ul>
            {todos.map(todo => (
            <Todo 
                key={todo.id} {...todo} 
                onClick={() => dispatch(toggleTodo(todo.id))} 
                onRemove={() => dispatch(removeTodo(todo.id))}/>
            ))}
        </ul>
    )
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  toggleTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired
}

export default TodoList