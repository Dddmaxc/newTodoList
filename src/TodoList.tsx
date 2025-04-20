import { ChangeEvent, useState } from "react";
import { FilterValueType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpun } from "./EditableSpun";
import { title } from "process";

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
    <div>
      <h3>
        <EditableSpun title={props.title} onChange={changeTodoListTitle} />
        <button onClick={removeTodoList}>x</button>
      </h3>
      <AddItemForm addItem={AddTask} />
      <ul>
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
            <li className={t.isDone ? "is-done" : ""}>
              <input
                onChange={onChangeStatusHandler}
                type="checkbox"
                checked={t.isDone}
              />
              <EditableSpun title={t.title} onChange={onChangeTitleHandler} />

              <button onClick={onRemoveHandler}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={onAllClickHandler}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "active-filter" : ""}
          onClick={onActiveClickHandler}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "active-filter" : ""}
          onClick={onCompletedClickHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
