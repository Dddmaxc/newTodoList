import { v1 } from "uuid";
import { TaskStateType } from "../AppWithRedux";
import {
  addTaskAC,
  changeStatusTaskAC,
  changeTitleTaskAC,
  removeTaskAC,
  tasksReducer,
} from "./tasks-reducer";
import { addTodoListAC, removeTodoListAC } from "./todoList-reducer";

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

  const action = removeTaskAC("2", "todolistId1");

  const endState = tasksReducer(startState, action);

  expect(endState.todolistId1.length).toBe(4);
  expect(endState.todolistId2.length).toBe(3);
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
      { id: "1", title: "Books", isDone: true },
      { id: "2", title: "Games", isDone: true },
      { id: "3", title: "Clothes", isDone: false },
    ],
  };

  const action = addTaskAC("todolistId2", "Anime");

  const endState = tasksReducer(startState, action);

  expect(endState.todolistId2.length).toBe(4);
  expect(endState.todolistId2[0].isDone).toBe(false);
  expect(endState.todolistId2[0].title).toBe("Anime");
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

  const action = changeStatusTaskAC("todolistId1", "2", false);

  const endState = tasksReducer(startState, action);

  // Проверяем, что статус задачи с id="2" в todolistId1 изменился на false
  expect(endState.todolistId1[1].isDone).toBeFalsy();
  expect(endState.todolistId2[1].isDone).toBeTruthy();
});

test("the task title  should be changed curectly", () => {
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

  const action = changeTitleTaskAC("todolistId1", "1", "SASS");

  const endState = tasksReducer(startState, action);

  // Проверяем, что статус задачи с id="2" в todolistId1 изменился на false
  expect(endState.todolistId1[0].title).toBe("SASS");
  expect(endState.todolistId2[0].title).toBe("Book");
});

test("property with new array shuold be added when new todolis is added", () => {
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

  const action = addTodoListAC("new todoList");
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k != "todolistId1" && k != "todolistId2");
  if (!newKey) {
    throw Error("new key should be added");
  }
  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test("property with todolistId should be deleted", () => {
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

  const action = removeTodoListAC("todolistId2");
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).toBeUndefined;
});
