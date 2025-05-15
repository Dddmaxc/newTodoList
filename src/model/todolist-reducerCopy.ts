import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterValueType, TodolistType } from "../app/AppWithRedux";

const initialState: Array<TodolistType> = [];

const todolistSlice = createSlice({
  name: "todolists",
  initialState,
  reducers: {
    removeTodoListS(state, action: PayloadAction<{ todolistId: string }>) {
      const index = state.findIndex((t) => t.id === action.payload.todolistId);
      if (index !== -1) {
        // если ничего не найдено findIndex возвращает -1.
        //  означает (index !== - 1) если index найден тогда удаляем
        state.splice(index, 1);
      }
    },
    
    addTodoListS(
      state,
      action: PayloadAction<{
        todolistid: string;
        title: string;
      }>
    ) { 

      const newTodoList: TodolistType = {
        id: action.payload.todolistid,
        title: action.payload.title,
        filter: "all" as FilterValueType,
      };
      state.unshift(newTodoList);
    },
    changeTodoListTitleS(
      state,
      action: PayloadAction<{
        todolistId: string;
        title: string;
      }>
    ) {
      const todolistNewTitle = state.find(
        (t) => t.id === action.payload.todolistId
      );
      if (todolistNewTitle) todolistNewTitle.title = action.payload.title;
    },
    changeTodoListFilterS(
      state,
      action: PayloadAction<{
        todolistId: string;
        filter: FilterValueType;
      }>
    ) {
      const updateFilter = state.find(
        (t) => t.id === action.payload.todolistId
      );
      if (updateFilter) updateFilter.filter = action.payload.filter;
    },
  },
});

export const {
  removeTodoListS,
  addTodoListS,
  changeTodoListTitleS,
  changeTodoListFilterS,
} = todolistSlice.actions;
export default todolistSlice.reducer;
