import { TaskStateType, TodolistType } from "../App"
import { tasksReducer } from "./tasks-reducer"
import { addTodoListAC, todolistReducer } from "./todoList-reducer"

test("ids should be equals", () => {
    const startTasksState: TaskStateType = {}
    const startTodolistsState: Array<TodolistType> = []

    const action = addTodoListAC("new todolist")
    const andTasksState = tasksReducer(startTasksState, (action))
    const endTodolistState = todolistReducer(startTodolistsState, (action))

    const keys = Object.keys(andTasksState)
    const idFormTasks = keys[0]
    const idFormTodolists = endTodolistState[0].id

    expect(idFormTasks).toBe(action.todoListId)
    expect(idFormTodolists).toBe(action.todoListId)
})