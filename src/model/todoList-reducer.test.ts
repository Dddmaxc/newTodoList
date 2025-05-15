import { v1 } from "uuid";
import { FilterValueType, TodolistType } from "../app/AppWithRedux";
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
  todolistReducer,
} from "./todoList-reducer";

test("correct todolist should be removed", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const startState: Array<TodolistType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];

  const endState = todolistReducer(startState, removeTodoListAC(todolistId1));
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

  const endState = todolistReducer(startState, addTodoListAC(newTodolistTitle));

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
  const action = changeTodoListTitleAC(todolistId2, newTodolistTitle);

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
    changeTodoListFilterAC(todolistId2, newFilter)
  );

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});

// type Student = {
//   id: number
//   name: string
// }

// type Friends = {
//   [key: string]: string[]
// }

// export const students: Student[] = [
//   { id: 1, name: "Bob" },
//   { id: 2, name: "Alex" },
//   { id: 3, name: "Ann" },
//   { id: 4, name: "Charley" },
// ]

// export const friends: Friends = {
//   1: ["Oliver", "Jack", "Oscar"],
//   2: ["Jack", "Lewis", "Thomas"],
//   3: ["William", "Michael", "Lewis"],
//   4: ["Oscar", "James", "William"],
// }

// const getMutualFriends = (st_1: Student, st_2: Student) => {
//   const result: string[] = []
//   friends[st_1.id].forEach((f) => (friends[st_2.id].includes(f) ? result.push(f) : null))
//   return result
// }

// // Дан массив студентов и структура,
// // которая содержит список друзей каждого из студентов.
// // Так же дана функция getMutualFriends, проверяющая наличие общих друзей
// // у двух выбранных студентов.
// // Функция принимает параметром два объекта типа Student
// // и возвращает массив с именами общих друзей,
// // если они есть и пустой массив, если таковых нету.
// // Что надо написать вместо ххх, чтобы функция работала?
