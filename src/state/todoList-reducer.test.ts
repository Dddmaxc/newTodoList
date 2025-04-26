import { v1 } from "uuid";
import { FilterValueType, TodolistType } from "../App";
import {
  AddTodoListAC,
  ChangeTodoListFilterAC,
  ChangeTodoListTitleAC,
  RemoveTodoListAC,
  todolistReducer,
} from "./todoList-reducer";

test("correct todolist should be removed", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const startState: Array<TodolistType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];

  const endState = todolistReducer(startState, RemoveTodoListAC(todolistId1));
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodolistTitle = "New Todolist";

  const startState: Array<TodolistType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];

  const endState = todolistReducer(startState, AddTodoListAC(newTodolistTitle));

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
  expect(endState[2].filter).toBe("all");
});

test("correct todolist should change its name", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodolistTitle = "New Todolist";

  const startState: Array<TodolistType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];
  const action = ChangeTodoListTitleAC(todolistId2, newTodolistTitle);

  const endState = todolistReducer(startState, action);

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be change", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newFilter: FilterValueType = "completed";

  const startState: Array<TodolistType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];

  const endState = todolistReducer(
    startState,
    ChangeTodoListFilterAC(todolistId2, newFilter)
  );

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});
