import { v1 } from "uuid"
import todolistReducer, {
  createTodolistS,
  deleteTodolistS,
  changeTodolistFilterS,
  DomainTodolist,
  FilterValues,
} from "../todolist-slice"

test("correct todolist should be removed", () => {
  let todolistId1 = v1()
  let todolistId2 = v1()

  const startState: DomainTodolist[] = [
    { id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: "" },
    { id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: "" },
  ]

  const endState = todolistReducer(startState, deleteTodolistS({ id: todolistId1 }))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
  let todolistId1 = v1()
  let todolistId2 = v1()

  const newTodolistTitle = "New Todolist"

  const startState: DomainTodolist[] = [
    { id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: "" },
    { id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: "" },
  ]

  const endState = todolistReducer(startState, createTodolistS(newTodolistTitle))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTodolistTitle)
  expect(endState[0].filter).toBe("all")
})

test("correct filter of todolist should be changed", () => {
  let todolistId1 = v1()
  let todolistId2 = v1()

  const newFilter: FilterValues = "completed"

  const startState: DomainTodolist[] = [
    { id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: "" },
    { id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: "" },
  ]

  const endState = todolistReducer(
    startState,
    changeTodolistFilterS({ todolistId: todolistId2, filter: newFilter }),
  )

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe(newFilter)
})
