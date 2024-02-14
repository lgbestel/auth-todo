import { createSlice } from "@reduxjs/toolkit";

interface ITask {
  id: string,
  text: string,
  completed: boolean,
}
export interface InitialStateTodo {
  todos: ITask[],
}

export const INITIAL_STATE: InitialStateTodo = {
  todos: [],
}

const todoSlice = createSlice({
  name: 'todo',
  initialState: INITIAL_STATE,
  reducers: {
    setTodos: (state: InitialStateTodo, action) => void(state.todos = action.payload),
    clear: () => INITIAL_STATE,
  },
})

export default todoSlice;