import React from 'react'
import PropTypes from 'prop-types'

const Todo = ({ onClick, onRemove, completed, text }) => (
    <>
        <li
            onClick={onClick}
            style={{
            textDecoration: completed ? 'line-through' : 'none'
            }}
        >
            {text}
        </li>
        <button onClick={onRemove}>
            remove
        </button>
    </>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo