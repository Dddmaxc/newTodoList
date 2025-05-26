import { TaskPriority, TaskStatus } from "@/common/enums/enums"

export type DomainTasks = {
  id: string 
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
  todoListId: string
  order: number
  addedDate: string
}

export type TasksResponse = {
  items: DomainTasks[]
  totalCount: number
  error: string | null
}
export type UpdateTaskModal = {
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
}

