import { createSlice } from "@reduxjs/toolkit"
import { v1 } from "uuid"
import { createTodolistS, deleteTodolistS } from "./todolist-slice"

export type TasksState = Record<string, Array<Task>>
export type Task = {
  id: string
  title: string
  isDone: boolean
}

const initialState: TasksState = {}

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: (create) => ({
    createTaskS: create.reducer<{ todolistId: string; title: string }>((state, action) => {
      const { todolistId, title } = action.payload
      const newTask = { id: v1(), title, isDone: false }
      if (!state[todolistId]) {
  state[todolistId] = []
}
      state[todolistId].unshift(newTask)
    }),
    deleteTaskS: create.reducer<{ todolistId: string; taskId: string }>((state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (index !== -1) tasks.splice(index, 1)
    }),
    changeTaskStatusS: create.reducer<{
      todolistId: string
      taskId: string
      isDone: boolean
    }>((state, action) => {
      const task = state[action.payload.todolistId].find((t) => t.id === action.payload.taskId)
      if (task) task.isDone = action.payload.isDone
    }),
    changeTaskTitleS: create.reducer<{
      todolistId: string
      taskId: string
      title: string
    }>((state, action) => {
      const task = state[action.payload.todolistId].find((t) => t.id === action.payload.taskId)
      if (task) task.title = action.payload.title
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistS, (state, action) => {
        state[action.payload.id] = []
      })
      .addCase(deleteTodolistS, (state, action) => {
        delete state[action.payload.id]
      })
  },
  selectors: {
    selectTasks: (state) => state
  }
})

export const { createTaskS, deleteTaskS, changeTaskStatusS, changeTaskTitleS } = tasksSlice.actions
export const {selectTasks} = tasksSlice.selectors
export default tasksSlice.reducer
