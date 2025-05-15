import { v1 } from "uuid";
import { TaskStateType } from "../app/AppWithRedux";
import tasksReducer, {
  addTaskS,
  changeStatusTaskS,
  changeTitleTaskS,
  removeTaskS,
} from "./tasks-reducerCopy";
import { addTodoListS, removeTodoListS } from "./todolist-reducerCopy";

let startState: TaskStateType;

beforeEach(() => {
  startState = {
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
});

test("correct task should be removed", () => {
  const action = removeTaskS({ todolistId: "todolistId1", taskId: "2" });
  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(4);
  expect(endState["todolistId1"].some((t) => t.id === "2")).toBeFalsy();
});

test("correct task should be added", () => {
  const action = addTaskS({ todolistId: "todolistId2", title: "Anime" });
  const endState = tasksReducer(startState, action);

  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].title).toBe("Anime");
  expect(endState["todolistId2"][0].isDone).toBe(false);
});

test("status of specified task should be changed", () => {
  const action = changeStatusTaskS({
    todolistId: "todolistId1",
    taskId: "2",
    isDone: false,
  });
  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"][1].isDone).toBe(false);
});

test("the task title should be changed correctly", () => {
  const action = changeTitleTaskS({
    todolistId: "todolistId1",
    taskId: "1",
    title: "SASS",
  });
  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"][0].title).toBe("SASS");
});

test("property with new array should be added when new todolist is added", () => {
  const newTodolistId = v1();
  const action = addTodoListS({ todolistid: newTodolistId, title: "New List" });
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k === newTodolistId);

  expect(newKey).toBeDefined();
  expect(endState[newTodolistId]).toEqual([]);
  expect(keys.length).toBe(3);
});

test("property with todolistId should be deleted", () => {
  const action = removeTodoListS({ todolistId: "todolistId2" });
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).toBeUndefined();
});
