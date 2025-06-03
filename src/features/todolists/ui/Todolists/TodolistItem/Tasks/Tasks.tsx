import { List } from "@mui/material"
import { useAppSelector } from "../../../../../../common/hooks/useAppSelector"
import { DomainTodolist } from "../../../../model/todolist-slice"

import { TaskItem } from "./TasksItem/TaskItem"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  // props
  const { id, filter } = todolist
  // useSelector
  const tasks = useAppSelector((state) => state.tasks)

  // filter for buttons: all, active, completed
  const todolistTasks = tasks[id] || []
  let filteredTasks = todolistTasks
  if (filter === "active") {
    filteredTasks = todolistTasks.filter((task) => !task.isDone)
  }
  if (filter === "completed") {
    filteredTasks = todolistTasks.filter((task) => task.isDone)
  }

  if (filteredTasks?.length === 0) {
    return <p>Тасок нет</p>
  }

  return (
    <List>
      {filteredTasks?.map((task) => {
        return <TaskItem todolistId={id} task={task} key={task.id} />
      })}
    </List>
  )
}
