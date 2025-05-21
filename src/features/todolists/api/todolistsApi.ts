import { instance } from "@/common/components/instance/instance";
import { Todolist } from "./todolistsApi.types";
import { BaseResponse } from "@/app/AppHttpRequests";

export const todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>("/todo-lists");
  },
  changeTodolistTitle(id: string, title: string) {
    return instance.put<Response>(`/todo-lists/${id}`, { title });
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${id}`);
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>("/todo-lists", {
      title,
    });
  },
};
