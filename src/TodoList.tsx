import { ChangeEvent } from "react";
import { AddItemForm } from "./AddItemForm";
import { EditableSpun } from "./EditableSpun";
import { Button, Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import s from "./Todolist.module.css";
import { deepPurple } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "./state/store";
import {
  addTaskAC,
  changeStatusTaskAC,
  changeTitleTaskAC,
  removeTaskAC,
} from "./state/tasks-reducer";
import { FilterValueType } from "./AppWithRedux";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type PropsType = {
  title: string;
  changeFilter: (value: FilterValueType, idTodolist: string) => void;
  changeTodoListTitle: (newTitle: string, todolistId: string) => void;
  removeTodoList: (todolistId: string) => void;
  filter: FilterValueType;
  id: string;
};

export function TodoList(props: PropsType) {
  const dispatch = useDispatch();

  const tasks = useSelector<AppRootState, TaskType[]>(
    (state) => state.tasks[props.id]
  );

  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () =>
    props.changeFilter("completed", props.id);

  const removeTodoList = () => {
    props.removeTodoList(props.id);
  };

  const AddTask = (title: string) => {
    dispatch(addTaskAC(props.id, title));
  };

  const changeTodoListTitle = (newTitle: string) => {
    props.changeTodoListTitle(newTitle, props.id);
  };

  let tasksForTodoList = tasks;
            if (props.filter === "completed") {
              tasksForTodoList = tasksForTodoList.filter(
                (t) => t.isDone === true
              );
            }
            if (props.filter === "active") {
              tasksForTodoList = tasksForTodoList.filter(
                (t) => t.isDone === false
              );
            }

  return (
    <div className={s.containrt}>
      <h3>
        <EditableSpun title={props.title} onChange={changeTodoListTitle} />
        <IconButton
          onClick={removeTodoList}
          aria-label={"delete"}
          color={"info"}
        >
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={AddTask} />
      <div>
        {tasksForTodoList.map((t) => {
          const onRemoveHandler = () => {
            dispatch(removeTaskAC(t.id, props.id));
          };

          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            dispatch(changeStatusTaskAC(props.id, t.id, newIsDoneValue));
          };
          const onChangeTitleHandler = (newValue: string) => {
            dispatch(changeTitleTaskAC(props.id, t.id, newValue));
          };

          return (
            <div key={t.id} className={t.isDone ? "is-done" : ""}>
              <Checkbox
                sx={{
                  color: deepPurple[500],
                  "&.Mui-checked": {
                    color: deepPurple[500],
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
          );
        })}
      </div>
      <div className={s.containerButton}>
        <Button
          variant={props.filter === "all" ? "contained" : "text"}
          onClick={onAllClickHandler}
          color={"secondary"}
          className={s.button}
        >
          All
        </Button>
        <Button
          variant={props.filter === "active" ? "contained" : "text"}
          onClick={onActiveClickHandler}
          color={"secondary"}
          className={s.button}
        >
          Active
        </Button>
        <Button
          variant={props.filter === "completed" ? "contained" : "text"}
          onClick={onCompletedClickHandler}
          color={"secondary"}
          className={s.button}
        >
          Completed
        </Button>
      </div>
    </div>
  );
}
