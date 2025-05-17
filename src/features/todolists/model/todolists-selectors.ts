import { RootState } from "@/app/store";
import { Todolist } from "./todolist-slice";

export const selectTodolists = (state: RootState): Array<Todolist> =>
  state.todolists;
