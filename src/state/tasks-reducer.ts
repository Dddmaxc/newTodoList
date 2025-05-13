import { TaskStateType } from "../AppWithRedux";
import { v1 } from "uuid";
import {
  AddTodoListActionType,
  RemoveTodoListActionType,
} from "./todoList-reducer";

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
type AddTaskActionType = ReturnType<typeof addTaskAC>;
type ChangeStatusTaskActionType = ReturnType<typeof changeStatusTaskAC>;
type ChangeTitleTaskActioneType = ReturnType<typeof changeTitleTaskAC>;

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
      const { todolistId, taskId } = action;
      const stateCopy = { ...state };
      const task = stateCopy[todolistId];
      const filteredTasks = task.filter((t) => t.id !== taskId);
      stateCopy[todolistId] = filteredTasks;

      return stateCopy;
    }
    case "ADD-TASK": {
      const { todolistId, title } = action;
      const stateCopy = { ...state };
      const tasks = stateCopy[todolistId];
      const newTask = { id: v1(), title, isDone: false };
      const newTasks = [newTask, ...tasks];
      stateCopy[todolistId] = newTasks;

      return stateCopy;
    }
    case "CHANGE-STATUS-TASK": {
      const { todolistId, isDone, taskId } = action;
      const stateCopy = { ...state };
      const task = stateCopy[todolistId];
      stateCopy[todolistId] = task.map((t) =>
        t.id === taskId ? { ...t, isDone: isDone } : t
      );

      return stateCopy;
    }

    case "CHANGE-TITLE-TASK": {
      const { todolistId, newTitle } = action;
      const tasks = state[todolistId];
      const newTasks = tasks.map((t) =>
        t.id === action.taskId ? { ...t, title: newTitle } : t
      );

      return {
        ...state,
        [todolistId]: newTasks,
      };
    }
    case "ADD-TODOLIST": {
      const { todoListId } = action;
      const stateCopy = { ...state };
      stateCopy[todoListId] = [];
      return stateCopy;
    }
    case "REMOVE-TODOLIST": {
      const { todolistId } = action;
      const stateCopy = { ...state };
      delete stateCopy[todolistId];
      return stateCopy;
    }
    default:
      return state;
  }
};

export const removeTaskAC = (taskId: string, todolistId: string) =>
  ({
    type: "REMOVE-TASK",
    taskId,
    todolistId,
  } as const);

export const addTaskAC = (todolistId: string, title: string) =>
  ({
    type: "ADD-TASK",
    todolistId,
    title,
  } as const);

export const changeStatusTaskAC = (
  todolistId: string,
  taskId: string,
  isDone: boolean
) =>
  ({
    type: "CHANGE-STATUS-TASK",
    todolistId,
    taskId,
    isDone,
  } as const);

export const changeTitleTaskAC = (
  todolistId: string,
  taskId: string,
  newTitle: string
) =>
  ({
    type: "CHANGE-TITLE-TASK",
    todolistId,
    taskId,
    newTitle,
  } as const);
