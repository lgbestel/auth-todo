import { createSlice } from "@reduxjs/toolkit";

export interface InitialStateTodo {
  todos: any[],
}

export const INITIAL_STATE: InitialStateTodo = {
  todos: [],
}

const todoSlice = createSlice({
  name: 'todo',
  initialState: INITIAL_STATE,
  reducers: {
    setTodos: (state: InitialStateTodo, action) => state.todos = action.payload,
    clear: () => INITIAL_STATE,
  },
})

export default todoSlice;