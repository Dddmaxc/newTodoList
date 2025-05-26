import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type FilterValues = "all" | "active" | "completed"
export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}
const initialState: Array<Todolist> = []

const todolistSlice = createSlice({
  name: "todolists",
  initialState,
  reducers: {
    deleteTodolistS(state, action: PayloadAction<{ todolistId: string }>) {
      const index = state.findIndex((t) => t.id === action.payload.todolistId)
      if (index !== -1) {
        // если ничего не найдено findIndex возвращает -1.
        //  означает (index !== - 1) если index найден тогда удаляем
        state.splice(index, 1)
      }
    },

    createTodolistS(
      state,
      action: PayloadAction<{
        todolistid: string
        title: string
      }>,
    ) {
      const newTodoList: Todolist = {
        id: action.payload.todolistid,
        title: action.payload.title,
        filter: "all" as FilterValues,
      }
      state.unshift(newTodoList)
    },
    changeTodolistTitleS(
      state,
      action: PayloadAction<{
        todolistId: string
        title: string
      }>,
    ) {
      const todolistNewTitle = state.find((t) => t.id === action.payload.todolistId)
      if (todolistNewTitle) todolistNewTitle.title = action.payload.title
    },
    changeTodolistFilterS(
      state,
      action: PayloadAction<{
        todolistId: string
        filter: FilterValues
      }>,
    ) {
      const updateFilter = state.find((t) => t.id === action.payload.todolistId)
      if (updateFilter) updateFilter.filter = action.payload.filter
    },
  },
})

export const { deleteTodolistS, createTodolistS, changeTodolistTitleS, changeTodolistFilterS } = todolistSlice.actions
export default todolistSlice.reducer
