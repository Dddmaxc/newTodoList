import { v1 } from "uuid";
import { FilterValueType, TodolistType } from "../app/AppWithRedux";

// Типы экшенов (должны идти после Action Creators)
export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>;
export type AddTodoListActionType = ReturnType<typeof addTodoListAC>;
export type ChangeTodoListTitleActionType = ReturnType<
  typeof changeTodoListTitleAC
>;
export type ChangeTodoListFilterActionType = ReturnType<
  typeof changeTodoListFilterAC
>;

// Объединённый тип всех экшенов
export type ActionType =
  | RemoveTodoListActionType
  | AddTodoListActionType
  | ChangeTodoListTitleActionType
  | ChangeTodoListFilterActionType;

// изначальные данные
const initialState: Array<TodolistType> = [];

// Редьюсер
export const todolistReducer = (
  state: Array<TodolistType> = initialState,
  action: ActionType
): Array<TodolistType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((todolist) => todolist.id !== action.todolistId);
    }
    case "ADD-TODOLIST": {
      const { todoListId, title } = action;
      return [
        {
          id: todoListId,
          title,
          filter: "all",
        },
        ...state,
      ];
    }

    case "CHANGE-TODOLIST-TITLE": {
      const { todolistId, title } = action;
      return state.map((todolist) =>
        todolist.id === todolistId ? { ...todolist, title } : todolist
      );
    }

    case "CHANGE-TODOLIST-FILTER": {
      const { todolistId, filter } = action;
      return state.map((todolist) =>
        todolist.id === todolistId ? { ...todolist, filter } : todolist
      );
    }

    default:
      return state;
  }
};

// Action Creators
export const removeTodoListAC = (todolistId: string) =>
  ({
    type: "REMOVE-TODOLIST",
    todolistId,
  } as const);

export const addTodoListAC = (title: string) =>
  ({
    type: "ADD-TODOLIST",
    title,
    todoListId: v1(),
  } as const);

export const changeTodoListTitleAC = (todolistId: string, title: string) =>
  ({
    type: "CHANGE-TODOLIST-TITLE",
    todolistId,
    title,
  } as const);

export const changeTodoListFilterAC = (
  todolistId: string,
  filter: FilterValueType
) =>
  ({
    type: "CHANGE-TODOLIST-FILTER",
    todolistId,
    filter,
  } as const);
