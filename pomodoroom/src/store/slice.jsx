import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: [
        { id: 1, text: 'Create todo', status: "incomplete" },
        { id: 2, text: 'Another todo', status: "incomplete" },
        { id: 3, text: 'Redux todo', status: "incomplete" },
    ]
}


export const todoSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    addToTodos: (state, action) => {
      const newTodo = action.payload;
      state.todos.push(newTodo);
    },
    editTodos: (state, action) => {
      const { id, text } = action.payload;
      const existingTodo = state.todos.find((todo) => todo.id === id);
      if (existingTodo) {
        existingTodo.text = text;
      }
    },
    removeFromTodos: (state, action) => {
      const id = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== id);
    },
    changeTodoStatus: (state, action) => {
      const id = action.payload;
      const existingTodo = state.todos.find((todo) => todo.id === id);
      if (existingTodo.status === "incomplete") {
        existingTodo.status = "complete";
      } else {
        existingTodo.status = "incomplete";
      }
    },
  },
});

export const { addToTodos, editTodos, removeFromTodos, changeTodoStatus } =
  todoSlice.actions;

export default todoSlice.reducer;
