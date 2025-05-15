import { v1 } from "uuid";
import { FilterValueType, TodolistType } from "../app/AppWithRedux";
import todolistReducer, {
  addTodoListS,
  removeTodoListS,
  changeTodoListTitleS,
  changeTodoListFilterS,
} from "./todolist-reducerCopy";

test("correct todolist should be removed", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const startState: Array<TodolistType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];

  const endState = todolistReducer(
    startState,
    removeTodoListS({ todolistId: todolistId1 })
  );

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodolistTitle = "New Todolist";
  let newTodolistid = v1();

  const startState: Array<TodolistType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];

  const endState = todolistReducer(
    startState,
    addTodoListS({ title: newTodolistTitle, todolistid: newTodolistid })
  );

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodolistTitle);
  expect(endState[0].filter).toBe("all");
});

test("correct todolist should change its name", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodolistTitle = "New Todolist";

  const startState: Array<TodolistType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];

  const endState = todolistReducer(
    startState,
    changeTodoListTitleS({ todolistId: todolistId2, title: newTodolistTitle })
  );

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newFilter: FilterValueType = "completed";

  const startState: Array<TodolistType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];

  const endState = todolistReducer(
    startState,
    changeTodoListFilterS({ todolistId: todolistId2, filter: newFilter })
  );

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});
