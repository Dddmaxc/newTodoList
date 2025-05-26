import { type ChangeEvent, type CSSProperties, useEffect, useState } from "react"
import Checkbox from "@mui/material/Checkbox"
import { CreateItemForm, EditableSpan } from "@/common/components"
import { Todolist } from "@/features/todolists/api/todolistsApi.types"
import { todolistsApi } from "@/features/todolists/api/todolistsApi"
import { tasksApi } from "@/features/todolists/api/tasksApi"
import { DomainTasks, UpdateTaskModal } from "@/features/todolists/api/tasksApi.type"
import { TaskStatus } from "@/common/enums/enums"

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<Record<string, DomainTasks[]>>({})

  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      const todolists = res.data
      setTodolists(todolists)
      todolists.forEach((todolist) => {
        tasksApi.getTasks(todolist.id).then((res) => {
          setTasks((prevTasks) => ({
            ...prevTasks,
            [todolist.id]: res.data.items,
          }))
        })
      })
    })
  }, [])

  const createTodolist = (title: string) => {
    todolistsApi.createTodolist(title).then((res) => {
      const newTodolist = res.data.data.item
      setTodolists([newTodolist, ...todolists])
    })
  }

  const deleteTodolist = (id: string) => {
    todolistsApi.deleteTodolist(id).then(() => {
      setTodolists(todolists.filter((t) => t.id !== id))
    })
  }

  const changeTodolistTitle = (id: string, title: string) => {
    todolistsApi.changeTodolistTitle(id, title).then(() => {
      setTodolists(todolists.map((t) => (t.id === id ? { ...t, title } : t)))
    })
  }

  const createTask = (todolistId: string, title: string) => {
    tasksApi.createTask(todolistId, title).then((res) => {
      setTasks({ ...tasks, [todolistId]: [res.data.data.item, ...tasks[todolistId]] })
    })
  }

  const deleteTask = (todolistId: string, taskId: string) => {
    tasksApi.deleteTask(todolistId, taskId).then(() => {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [todolistId]: prevTasks[todolistId].filter((t) => t.id !== taskId),
      }))
    })
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: DomainTasks) => {
    const model: UpdateTaskModal = {
      description: task.description,
      title: task.title,
      status: e.currentTarget.checked ? TaskStatus.Completed : 0,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    }
    tasksApi
      .changeTaskStatus({ todolistId: task.todoListId, taskId: task.id, model })
      .then((res) => {
        setTasks((prevTasks) => ({
          ...prevTasks,
          [task.todoListId]: prevTasks[task.todoListId].map((t) =>
            t.id === task.id ? res.data.data.item : t,
          ),
        }))
      })
  }

  const changeTaskTitle = (task: DomainTasks, title: string) => {
    const model: UpdateTaskModal = {
      description: task.description,
      title: title,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    }
    tasksApi
      .changeTaskTitle({ todolistId: task.todoListId, taskId: task.id, model })
      .then((res) => {setTasks(prevTasks => ({
        ...prevTasks,
        [task.todoListId]: prevTasks[task.todoListId].map(t => t.id === task.id ? res.data.data.item : t)
      }))})
  }

  return (
    <div style={{ margin: "20px" }}>
      <CreateItemForm onCreateItem={createTodolist} />
      {todolists.map((todolist: Todolist) => (
        <div key={todolist.id} style={container}>
          <div>
            <EditableSpan
              value={todolist.title}
              onChange={(title) => changeTodolistTitle(todolist.id, title)}
            />
            <button onClick={() => deleteTodolist(todolist.id)}>x</button>
          </div>
          <CreateItemForm onCreateItem={(title) => createTask(todolist.id, title)} />
          {tasks[todolist.id]?.map((task: any) => (
            <div key={task.id}>
              <Checkbox
                checked={task.status === TaskStatus.Completed}
                onChange={(e) => changeTaskStatus(e, task)}
              />
              <EditableSpan value={task.title} onChange={(title) => changeTaskTitle(task, title)} />
              <button onClick={() => deleteTask(todolist.id, task.id)}>x</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const container: CSSProperties = {
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
}
