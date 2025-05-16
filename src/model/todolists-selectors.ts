import { Todolist } from "../app/App";
import { RootState } from "../app/store";

export const selectTodolists = (state: RootState): Array<Todolist> =>
  state.todolists;