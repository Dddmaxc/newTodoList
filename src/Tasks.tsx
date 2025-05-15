import { useDispatch, useSelector } from "react-redux";
import { TaskType } from "./TodoList";
import { RootState } from "./app/store";
import {
  changeStatusTaskAC,
  changeTitleTaskAC,
  removeTaskAC,
} from "./model/tasks-reducer";
import { ChangeEvent } from "react";
import s from "./Todolist.module.css";
import { pink } from "@mui/material/colors";
import { EditableSpunMemo } from "./EditableSpun";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import React from "react";
import { useAppSelector } from "./common/hooks/useAppSelector";
import { useAppDispatch } from "./common/hooks/useAppDispatch";
import { TaskStateType } from "./app/AppWithRedux";
import { selectTasks } from "./model/tasks-selectors";

type TaskPropsType = {
  filter: string;
  id: string;
};



export const Tasks = React.memo(({ filter, id }: TaskPropsType) => {
  //useDispatch
  const dispatch = useAppDispatch();
// useSelect
  const tasks = useAppSelector(
   selectTasks
  );

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
          dispatch(removeTaskAC(t.id, id));
        };

        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
          let newIsDoneValue = e.currentTarget.checked;
          dispatch(changeStatusTaskAC(id, t.id, newIsDoneValue));
        };
        const onChangeTitleHandler = (newValue: string) => {
          dispatch(changeTitleTaskAC(id, t.id, newValue));
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
              <EditableSpunMemo
                title={t.title}
                onChange={onChangeTitleHandler}
              />
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
});
