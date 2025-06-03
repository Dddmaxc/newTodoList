import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { v1 } from "uuid"
import { Todolist } from "../api/todolistsApi.types"
import { todolistsApi } from "../api/todolistsApi"

export type FilterValues = "all" | "active" | "completed"
export type DomainTodolist = Todolist & {
  filter: FilterValues
}

const todolistSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  reducers: (create) => ({
    deleteTodolistS: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex((t) => t.id === action.payload.id)
      if (index !== -1) {
        // если ничего не найдено findIndex возвращает -1.
        //  означает (index !== - 1) если index найден тогда удаляем
        state.splice(index, 1)
      }
    }),
    changeTodolistFilterS: create.reducer<{
      todolistId: string
      filter: FilterValues
    }>((state, action) => {
      const updateFilter = state.find((t) => t.id === action.payload.todolistId)
      if (updateFilter) updateFilter.filter = action.payload.filter
    }),
    createTodolistS: create.preparedReducer(
      (title: string) => ({
        payload: {
          title,
          id: v1(),
        },
      }),
      (state, action) => {
        const newTodoList: DomainTodolist = {
          ...action.payload,
          filter: "all" as FilterValues,
          order: 0,
          addedDate: "",
        }
        state.unshift(newTodoList)
      },
    ),
  }),
  extraReducers: (builder) => {
    builder.addCase(fetchTodolistTC.fulfilled, (_state, action) => {
      return action.payload.todolists.map((t) => ({ ...t, filter: "all" }))
    })
    builder.addCase(ChangeTodolistTitleTC.fulfilled, (state, action) => {
       const todolistNewTitle = state.find((t) => t.id === action.payload.id)
      if (todolistNewTitle) todolistNewTitle.title = action.payload.title
    })
  },
  
  selectors: {
    selectTodolists: (state) => state,
  },
})

// Thunk
export const fetchTodolistTC = createAsyncThunk(
  "todolists/fetchTodolistTC",
  async (_, { rejectWithValue }) => {
    try {
      const res = await todolistsApi.getTodolists()
      return { todolists: res.data }
    } catch (error) {
      return rejectWithValue(null)
    }
  },
)

export const ChangeTodolistTitleTC = createAsyncThunk(
  "todolists/ChangeTodolistTitleTC",
  async (args: { id: string; title: string }, { rejectWithValue }) => {
    try {
      await todolistsApi.changeTodolistTitle(args.id, args.title)
      return args // Возвращаем результат для fulfilled
    } catch (error) {
      return rejectWithValue(null)
    }
  },
)

export const { deleteTodolistS, createTodolistS, changeTodolistFilterS } =
  todolistSlice.actions
export const { selectTodolists } = todolistSlice.selectors
export default todolistSlice.reducer
