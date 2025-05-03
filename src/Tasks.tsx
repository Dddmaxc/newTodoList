import { useDispatch, useSelector } from "react-redux";
import { TaskType } from "./TodoList";
import { AppRootState } from "./state/store";
import { changeStatusTaskAC, changeTitleTaskAC, removeTaskAC } from "./state/tasks-reducer";
import { ChangeEvent } from "react";
import s from "./Todolist.module.css"
import { pink } from "@mui/material/colors";
import { EditableSpunMemo } from "./EditableSpun";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import React from "react";

type TaskPropsType = {
  filter: string
  id: string
}
export const Tasks = React.memo(({filter, id}:TaskPropsType) => {

    const dispatch = useDispatch();

    const tasks = useSelector<AppRootState, TaskType[]>(
      (state) => state.tasks[id] ?? []
    );
    

    let tasksForTodoList = tasks;
    if (filter === "completed") {
      tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === true);
    }
    if (filter === "active") {
      tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === false);
    }

  return <>
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
})

