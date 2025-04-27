import { TaskStateType } from "../App";
import { TaskType } from "../TodoList";

type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  todolistId: string;
  taskId: string;
};

type AddTaskActionType = {
  type: "ADD-TASK";
  todolistId: string;
  task: TaskType;
};

type ChangeStatusTaskActionType = {
  type: "CHANGE-STATUS-TASK";
  todolistId: string;
  taskId: string;
  isDone: boolean;
};

export type ActionType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeStatusTaskActionType;

export const tasksReducer = (
  state: TaskStateType,
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
      const task = stateCopy[action.todolistId];
      const newTasks = [...task, action.task];
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
    default:
      throw new Error(`Uh, Error`);
  }
};

export const RemoveTaskAC = (
  taskId: string,
  todolistId: string
): RemoveTaskActionType => ({
  type: "REMOVE-TASK",
  taskId,
  todolistId,
});

export const AddTaskAC = (
  todolistId: string,
  task: TaskType
): AddTaskActionType => ({
  type: "ADD-TASK",
  todolistId,
  task,
});

export const ChangeStatusTaskAC = (
  todolistId: string,
  taskId: string,
  isDone: boolean
): ChangeStatusTaskActionType => ({
  type: "CHANGE-STATUS-TASK",
  todolistId,
  taskId,
  isDone,
});
