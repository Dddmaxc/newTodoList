import { createSlice, PayloadAction } from "@reduxjs/toolkit"
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
  reducers: {
    createTaskS(state, action: PayloadAction<{ todolistId: string; title: string }>) {
      const { todolistId, title } = action.payload
      const newTask = { id: v1(), title, isDone: false }
      state[todolistId].unshift(newTask)
    },
    deleteTaskS(state, action: PayloadAction<{ todolistId: string; taskId: string }>) {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (index !== -1) tasks.splice(index, 1)
    },
    changeTaskStatusS(
      state,
      action: PayloadAction<{
        todolistId: string
        taskId: string
        isDone: boolean
      }>,
    ) {
      const task = state[action.payload.todolistId].find((t) => t.id === action.payload.taskId)
      if (task) task.isDone = action.payload.isDone
    },
    changeTaskTitleS(
      state,
      action: PayloadAction<{
        todolistId: string
        taskId: string
        title: string
      }>,
    ) {
      const task = state[action.payload.todolistId].find((t) => t.id === action.payload.taskId)
      if (task) task.title = action.payload.title
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistS, (state, action) => {
        state[action.payload.todolistid] = []
      })
      .addCase(deleteTodolistS, (state, action) => {
        delete state[action.payload.todolistId]
      })
  },
})

export const { createTaskS, deleteTaskS, changeTaskStatusS, changeTaskTitleS } = tasksSlice.actions

export default tasksSlice.reducer
