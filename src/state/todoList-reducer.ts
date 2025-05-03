import { v1 } from "uuid";
import { FilterValueType, TodolistType } from "../AppWithRedux";

// Типы экшенов
export type RemoveTodoListActionType = {
  type: "REMOVE-TODOLIST";
  todolistId: string;
};

export type AddTodoListActionType = {
  type: "ADD-TODOLIST";
  title: string;
  todoListId: string;
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



const initialState: Array<TodolistType> = [];

// Редьюсер
export const todolistReducer = (
  state: Array<TodolistType> = initialState,
  action: ActionType
): Array<TodolistType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter((todolist) => todolist.id !== action.todolistId);

    case "ADD-TODOLIST":
      return [
        {
          id: action.todoListId,
          title: action.title,
          filter: "all",
        },
        ...state,
      ];

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
      return state;
  }
};

// Action Creators
export const removeTodoListAC = (
  todolistId: string
): RemoveTodoListActionType => ({
  type: "REMOVE-TODOLIST",
  todolistId,
});

export const addTodoListAC = (title: string): AddTodoListActionType => ({
  type: "ADD-TODOLIST",
  title,
  todoListId: v1(),
});

export const changeTodoListTitleAC = (
  todolistId: string,
  title: string
): ChangeTodoListTitleActionType => ({
  type: "CHANGE-TODOLIST-TITLE",
  todolistId,
  title,
});

export const changeTodoListFilterAC = (
  todolistId: string,
  filter: FilterValueType
): ChangeTodoListFilterActionType => ({
  type: "CHANGE-TODOLIST-FILTER",
  todolistId,
  filter,
});
