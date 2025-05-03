import { TaskStateType } from "../AppWithRedux";
import { v1 } from "uuid";
import {
  AddTodoListActionType,
  RemoveTodoListActionType,
} from "./todoList-reducer";

type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  todolistId: string;
  taskId: string;
};

type AddTaskActionType = {
  type: "ADD-TASK";
  todolistId: string;
  title: string;
};

type ChangeStatusTaskActionType = {
  type: "CHANGE-STATUS-TASK";
  todolistId: string;
  taskId: string;
  isDone: boolean;
};

type ChangeTitleTaskActioneType = {
  type: "CHANGE-TITLE-TASK";
  todolistId: string;
  taskId: string;
  newTitle: string;
};

export type ActionType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeStatusTaskActionType
  | ChangeTitleTaskActioneType
  | AddTodoListActionType
  | RemoveTodoListActionType;

const initialState: TaskStateType = {};

export const tasksReducer = (
  state: TaskStateType = initialState,
  action: ActionType
): TaskStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      const stateCopy = { ...state };
      const task = stateCopy[action.todolistId];
      const filteredTasks = task.filter((t) => t.id !== action.taskId);
      stateCopy[action.todolistId] = filteredTasks;

      return stateCopy;
    }
    case "ADD-TASK": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      const newTask = { id: v1(), title: action.title, isDone: false };
      const newTasks = [newTask, ...tasks];
      stateCopy[action.todolistId] = newTasks;

      return stateCopy;
    }
    case "CHANGE-STATUS-TASK": {
      const stateCopy = { ...state };
      const task = stateCopy[action.todolistId];
      stateCopy[action.todolistId] = task.map((t) =>
        t.id === action.taskId ? { ...t, isDone: action.isDone } : t
      );

      return stateCopy;
    }

    case "CHANGE-TITLE-TASK": {
      const tasks = state[action.todolistId];
      const newTasks = tasks.map((t) =>
        t.id === action.taskId ? { ...t, title: action.newTitle } : t
      );

      return {
        ...state,
        [action.todolistId]: newTasks,
      };
    }
    case "ADD-TODOLIST": {
      const stateCopy = { ...state };
      stateCopy[action.todoListId] = [];
      return stateCopy;
    }
    case "REMOVE-TODOLIST": {
      const stateCopy = { ...state };
      delete stateCopy[action.todolistId];
      return stateCopy;
    }
    default:
      return state;
  }
};

export const removeTaskAC = (
  taskId: string,
  todolistId: string
): RemoveTaskActionType => ({
  type: "REMOVE-TASK",
  taskId,
  todolistId,
});

export const addTaskAC = (
  todolistId: string,
  title: string
): AddTaskActionType => ({
  type: "ADD-TASK",
  todolistId,
  title,
});

export const changeStatusTaskAC = (
  todolistId: string,
  taskId: string,
  isDone: boolean
): ChangeStatusTaskActionType => ({
  type: "CHANGE-STATUS-TASK",
  todolistId,
  taskId,
  isDone,
});

export const changeTitleTaskAC = (
  todolistId: string,
  taskId: string,
  newTitle: string
): ChangeTitleTaskActioneType => ({
  type: "CHANGE-TITLE-TASK",
  todolistId,
  taskId,
  newTitle,
});
