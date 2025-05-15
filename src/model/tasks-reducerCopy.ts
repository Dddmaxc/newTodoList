import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskStateType } from "../app/AppWithRedux";
import { v1 } from "uuid";
import { addTodoListS, removeTodoListS } from "./todolist-reducerCopy";

const initialState: TaskStateType = {};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTaskS(state, action: PayloadAction<{ todolistId: string; title: string }>) {
      const { todolistId, title } = action.payload;
      const newTask = { id: v1(), title, isDone: false };
      state[todolistId].unshift(newTask);
    },
    removeTaskS(state, action: PayloadAction<{ todolistId: string; taskId: string }>) {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (index !== -1) tasks.splice(index, 1);
    },
    changeStatusTaskS(state, action: PayloadAction<{ todolistId: string; taskId: string; isDone: boolean }>) {
      const task = state[action.payload.todolistId].find((t) => t.id === action.payload.taskId);
      if (task) task.isDone = action.payload.isDone;
    },
    changeTitleTaskS(state, action: PayloadAction<{ todolistId: string; taskId: string; title: string }>) {
      const task = state[action.payload.todolistId].find((t) => t.id === action.payload.taskId);
      if (task) task.title = action.payload.title;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodoListS, (state, action) => {
        state[action.payload.todolistid] = [];
      })
      .addCase(removeTodoListS, (state, action) => {
        delete state[action.payload.todolistId];
      });
  },
});

export const {
  addTaskS,
  removeTaskS,
  changeStatusTaskS,
  changeTitleTaskS,
} = tasksSlice.actions;

export default tasksSlice.reducer; 
