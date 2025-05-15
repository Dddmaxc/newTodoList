import { TaskStateType } from "../app/AppWithRedux";
import { RootState } from "../app/store";

export const selectTasks = (state: RootState): TaskStateType =>
  state.tasks