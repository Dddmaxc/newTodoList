import { ChangeEvent } from "react";
import { FilterValueType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpun } from "./EditableSpun";
import { Button, Checkbox, IconButton } from "@mui/material";
import { Delete, Favorite, FavoriteBorder } from "@mui/icons-material";
import s from "./Todolist.module.css";
import { deepPurple, pink } from '@mui/material/colors';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: FilterValueType, idTodolist: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) => void;
  changeTodoListTitle: (newTitle: string, todolistId: string) => void;
  removeTodoList: (todolistId: string) => void;
  filter: FilterValueType;
  id: string;
};

export function TodoList(props: PropsType) {
  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () =>
    props.changeFilter("completed", props.id);
  const removeTodoList = () => {
    props.removeTodoList(props.id);
  };

  const AddTask = (title: string) => {
    props.addTask(title, props.id);
  };

  const changeTodoListTitle = (newTitle: string) => {
    props.changeTodoListTitle(newTitle, props.id);
  };

  return (
    <div className={s.containrt}>
      <h3>
        <EditableSpun title={props.title} onChange={changeTodoListTitle} />
        <IconButton onClick={removeTodoList} aria-label={"delete"} color={"info"}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={AddTask} />
      <div>
        {props.tasks.map((t) => {
          const onRemoveHandler = () => {
            props.removeTask(t.id, props.id);
          };

          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.id);
          };
          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.id);
          };

          return (
            <div className={t.isDone ? "is-done" : ""}>
              <Checkbox
               sx={{
                color: deepPurple[500],
                '&.Mui-checked': {
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
        >
          All
        </Button>
        <Button
          variant={props.filter === "active" ? "contained" : "text"}
          onClick={onActiveClickHandler}
          color={"secondary"}
        >
          Active
        </Button>
        <Button
          variant={props.filter === "completed" ? "contained" : "text"}
          onClick={onCompletedClickHandler}
          color={"secondary"}
        >
          Completed
        </Button>
      </div>
    </div>
  );
}
