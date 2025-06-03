import { CreateItemForm } from "../../../../../common/components/CreateItemForm/CreateItemForm"
import { createTaskS } from "../../../model/tasks-slice"
import { useAppDispatch } from "../../../../../common/hooks/useAppDispatch"
import { TodolistTitle } from "./TodolistTitle/todolistTitle"
import { Tasks } from "./Tasks/Tasks"
import { FilterButtons } from "./FilterButtons/FilterButtons"
import { DomainTodolist } from "@/features/todolists/model/todolist-slice"

type Props = {
  todolist: DomainTodolist
}

export const TodolistItem = ({ todolist }: Props) => {
  // props
  const { id } = todolist

  // useDispatch
  const dispatch = useAppDispatch()

  const createTask = (title: string) => {
    dispatch(createTaskS({ todolistId: id, title }))
  }
  // render todolist
  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTask} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
