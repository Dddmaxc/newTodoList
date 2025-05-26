import tasksReducer, { TasksState } from "../tasks-slice"
import todolistsReducer, { createTodolistS, Todolist } from "../todolist-slice"

test("generated ID should be the same in both reducers", () => {
  const startTasksState: TasksState = {}
  const startTodolistsState: Todolist[] = []

  const action = createTodolistS({
    todolistid: "test-id-123",
    title: "New TodoList",
  })

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const createdTaskId = Object.keys(endTasksState)[0]
  const createdTodolistId = endTodolistsState[0].id

  expect(createdTaskId).toBe("test-id-123")
  expect(createdTodolistId).toBe("test-id-123")
})
