import { instance } from "@/common/components/instance/instance"
import { DomainTasks, TasksResponse, UpdateTaskModal } from "./tasksApi.type"
import { BaseResponse } from "@/common/types"
// import { BaseResponse } from "@/common/types"

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<TasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string) {
    return instance.post<BaseResponse<{ item: DomainTasks }>>(`/todo-lists/${todolistId}/tasks`, { title })
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<BaseResponse<{ item: DomainTasks }>>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  changeTaskStatus(payloud: { todolistId: string; taskId: string; model: UpdateTaskModal }) {
    const { todolistId, taskId, model } = payloud
    return instance.put<BaseResponse<{ item: DomainTasks }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
changeTaskTitle(payload: { todolistId: string, taskId: string, model: UpdateTaskModal }) {
  const { todolistId, taskId, model } = payload
  return instance.put<BaseResponse<{ item: DomainTasks }>>(
    `/todo-lists/${todolistId}/tasks/${taskId}`,
    model
  )
}

}
