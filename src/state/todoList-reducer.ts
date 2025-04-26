import { v1 } from "uuid";
import { FilterValueType, TodolistType } from "../App";

// Типы экшенов
type RemoveTodoListActionType = {
  type: "REMOVE-TODOLIST";
  todolistId: string;
};

type AddTodoListActionType = {
  type: "ADD-TODOLIST";
  title: string;
};

type ChangeTodoListTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  todolistId: string;
  title: string;
};

type ChangeTodoListFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  todolistId: string;
  filter: FilterValueType;
};

// Объединённый тип всех экшенов
export type ActionType =
  | RemoveTodoListActionType
  | AddTodoListActionType
  | ChangeTodoListTitleActionType
  | ChangeTodoListFilterActionType;

// Редьюсер
export const todolistReducer = (
  state: Array<TodolistType>,
  action: ActionType
): Array<TodolistType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter((todolist) => todolist.id !== action.todolistId);

    case "ADD-TODOLIST":
      const newTodolist: TodolistType = {
        id: v1(),
        title: action.title,
        filter: "all",
      };
      return [...state, newTodolist];

    case "CHANGE-TODOLIST-TITLE":
      return state.map((todolist) =>
        todolist.id === action.todolistId
          ? { ...todolist, title: action.title }
          : todolist
      );

    case "CHANGE-TODOLIST-FILTER":
      return state.map((todolist) =>
        todolist.id === action.todolistId
          ? { ...todolist, filter: action.filter }
          : todolist
      );

    default:
      throw new Error(`Unhandled action type`);
  }
};

// Action Creators
export const RemoveTodoListAC = (todolistId: string): RemoveTodoListActionType => ({
  type: "REMOVE-TODOLIST",
  todolistId,
});

export const AddTodoListAC = (title: string): AddTodoListActionType => ({
  type: "ADD-TODOLIST",
  title,
});

export const ChangeTodoListTitleAC = (
  todolistId: string,
  title: string
): ChangeTodoListTitleActionType => ({
  type: "CHANGE-TODOLIST-TITLE",
  todolistId,
  title,
});

export const ChangeTodoListFilterAC = (
  todolistId: string,
  filter: FilterValueType
): ChangeTodoListFilterActionType => ({
  type: "CHANGE-TODOLIST-FILTER",
  todolistId,
  filter,
});
