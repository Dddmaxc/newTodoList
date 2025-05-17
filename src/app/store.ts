import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tasksSlice from "../features/todolists/model/tasks-slice";
import todolistSlice from "../features/todolists/model//todolist-slice";
import appSlice from "./appSlice";

// объединение reducer'ов с помощью combineReducers
const rootReducer = combineReducers({
  tasks: tasksSlice,
  todolists: todolistSlice,
  app: appSlice,
});

// создание store
export const store = configureStore({
  reducer: rootReducer,
});

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>;
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch;

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store;
