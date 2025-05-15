import { ChangeEvent } from "react";
import s from "./Todolist.module.css";
import { pink } from "@mui/material/colors";
import { EditableSpun } from "./EditableSpun";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useAppSelector } from "./common/hooks/useAppSelector";
import { useAppDispatch } from "./common/hooks/useAppDispatch";
import { selectTasks } from "./model/tasks-selectors";

import {
  changeStatusTaskS,
  changeTitleTaskS,
  removeTaskS,
} from "./model/tasks-reducerCopy";

type TaskPropsType = {
  filter: string;
  id: string;
};

export const Tasks = ({ filter, id }: TaskPropsType) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);

  let tasksForTodoList = tasks[id];
  if (filter === "completed") {
    tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === true);
  }
  if (filter === "active") {
    tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === false);
  }

  return (
    <>
      {tasksForTodoList.map((t) => {
        const onRemoveHandler = () => {
          dispatch(removeTaskS({ taskId: t.id, todolistId: id }));
        };

        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
          dispatch(
            changeStatusTaskS({
              todolistId: id,
              taskId: t.id,
              isDone: e.currentTarget.checked,
            })
          );
        };

        const onChangeTitleHandler = (newValue: string) => {
          dispatch(
            changeTitleTaskS({
              todolistId: id,
              taskId: t.id,
              title: newValue,
            })
          );
        };

        return (
          <div key={t.id} className={s.containerTasks}>
            <div className={t.isDone ? "is-done" : ""}>
              <Checkbox
                sx={{
                  color: pink[500],
                  "&.Mui-checked": {
                    color: pink[500],
                  },
                }}
                color={"secondary"}
                onChange={onChangeStatusHandler}
                checked={t.isDone}
              />
              <EditableSpun title={t.title} onChange={onChangeTitleHandler} />
              <IconButton
                onClick={onRemoveHandler}
                aria-label={"delete"}
                color={"info"}
              >
                <Delete />
              </IconButton>
            </div>
          </div>
        );
      })}
    </>
  );
};
