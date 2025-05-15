import { useCallback } from "react";
import { AddItemFormMemo } from "./model/AddItemForm";
import { EditableSpunMemo } from "./EditableSpun";
import { Button, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import s from "./Todolist.module.css";
import { useDispatch } from "react-redux";
import { addTaskAC } from "./model/tasks-reducer";
import { FilterValueType } from "./app/AppWithRedux";
import React from "react";
import { Tasks } from "./Tasks";

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

export const TodoList = React.memo((props: PropsType) => {
  console.log("TodoList");

  const dispatch = useDispatch();

  const onAllClickHandler = useCallback(
    () => props.changeFilter("all", props.id),
    [props.changeFilter, props.id]
  );
  const onActiveClickHandler = useCallback(
    () => props.changeFilter("active", props.id),
    [props.changeFilter, props.id]
  );
  const onCompletedClickHandler = useCallback(
    () => props.changeFilter("completed", props.id),
    [props.changeFilter, props.id]
  );

  const removeTodoList = useCallback(() => {
    props.removeTodoList(props.id);
  }, [props.removeTodoList, props.id]);

  const AddTask = useCallback(
    (title: string) => {
      dispatch(addTaskAC(props.id, title));
    },
    [dispatch, props.id]
  );

  const changeTodoListTitle = useCallback(
    (newTitle: string) => {
      props.changeTodoListTitle(newTitle, props.id);
    },
    [props.changeTodoListTitle, props.id]
  );

  return (
    <div className={s.containet}>
      <h3>
        <EditableSpunMemo title={props.title} onChange={changeTodoListTitle} />
        <IconButton
          onClick={removeTodoList}
          aria-label={"delete"}
          color={"info"}
        >
          <Delete />
        </IconButton>
      </h3>
      <AddItemFormMemo addItem={AddTask} />
      <div>
        <Tasks filter={props.filter} id={props.id} />
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
          color={"primary"}
        >
          Active
        </Button>
        <Button
          variant={props.filter === "completed" ? "contained" : "text"}
          onClick={onCompletedClickHandler}
          color={"success"}
        >
          Completed
        </Button>
      </div>
    </div>
  );
});
