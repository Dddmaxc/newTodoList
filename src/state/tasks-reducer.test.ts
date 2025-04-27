import { TaskStateType } from "../App";
import {
  AddTaskAC,
  ChangeStatusTaskAC,
  RemoveTaskAC,
  tasksReducer,
} from "./tasks-reducer";

test("correct task should be removed", () => {
  let startState: TaskStateType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
      { id: "4", title: "Rest API", isDone: false },
      { id: "5", title: "GraphQL", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "Book", isDone: true },
      { id: "2", title: "Games", isDone: true },
      { id: "3", title: "Clothes", isDone: false },
    ],
  };

  const action = RemoveTaskAC("2", "todolistId1");

  const endState = tasksReducer(startState, action);

  expect(endState.todolistId1.length).toBe(4);
  expect(endState.todolistId1.some((task) => task.id === "2")).toBeFalsy();
});

test("correct task should be add", () => {
  let startState: TaskStateType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
      { id: "4", title: "Rest API", isDone: false },
      { id: "5", title: "GraphQL", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "Book", isDone: true },
      { id: "2", title: "Games", isDone: true },
      { id: "3", title: "Clothes", isDone: false },
    ],
  };
  const task = {
    id: "4",
    title: "Naruto",
    isDone: false,
  };
  const action = AddTaskAC("todolistId2", task);

  const endState = tasksReducer(startState, action);

  expect(endState.todolistId2.length).toBe(4);
  expect(endState.todolistId2[3].id).toBe("4");
});

test("status of specified task should be change", () => {
  let startState: TaskStateType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
      { id: "4", title: "Rest API", isDone: false },
      { id: "5", title: "GraphQL", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "Book", isDone: true },
      { id: "2", title: "Games", isDone: true },
      { id: "3", title: "Clothes", isDone: false },
    ],
  };

  const action = ChangeStatusTaskAC("todolistId1", "2", false);

  const endState = tasksReducer(startState, action);

  // Проверяем, что статус задачи с id="2" в todolistId1 изменился на false
  expect(endState.todolistId1[1].isDone).toBe(false);
});
