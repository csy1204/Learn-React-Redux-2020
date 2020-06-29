import { createSlice } from '@reduxjs/toolkit';

let nextTodoId = 0

const todosSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
      addTodo: {
        reducer(state, action) {
          const { id, text } = action.payload
          state.push({ id, text, completed: false })
        },
        // 2번째 인자로 Callback 함수를 넘겨줌
        // https://redux-toolkit.js.org/api/createSlice#customizing-generated-action-creators
        prepare(text) {
          return { payload: { text, id: nextTodoId++ } }
        }
      },
      removeTodo(state, action) {
          const index = state.findIndex(todo => todo.id === action.payload)
          state.splice(index, 1);
      },
      toggleTodo(state, action) {
        const todo = state.find(todo => todo.id === action.payload)
        if (todo) {
          todo.completed = !todo.completed
        }
      }
    }
  })

export const incrementAsync = amount => dispatch => {
    setTimeout(() => {
        dispatch(addTodo(amount));
    }, 1000);
};

export const { addTodo, removeTodo, toggleTodo } = todosSlice.actions
export default todosSlice.reducer
