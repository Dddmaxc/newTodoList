import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { FilterValueType } from "./App";
import { title } from "process";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValueType) => void;
  addTask: (title: string) => void;
};

export function TodoList(props: PropsType) {
  let [newTaskTitle, setNewTaskTitle] = useState("");

  const onNewTitleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const addTaskHandler = () => {
    const trimmedTitle = newTaskTitle.trim();
    if (trimmedTitle) {
      props.addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const trimmedTitle = newTaskTitle.trim();
    if (e.key === "Enter" && trimmedTitle) {
      props.addTask(trimmedTitle);
      setNewTaskTitle("");
    }
  };

  const onAllClickHandler = () => props.changeFilter("all");
  const onActiveClickHandler = () => props.changeFilter("active");
  const onCompletedClickHandler = () => props.changeFilter("completed");

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onNewTitleOnChange}
          onKeyDown={onKeyDownHandler}
        />
        <button onClick={addTaskHandler}>+</button>
      </div>
      <ul>
        {props.tasks.map((t) => {

          const onRemoveHandler = () => {
            props.removeTask(t.id);
          };

          return (
            <li>
              <input type="checkbox" checked={t.isDone} />
              <span>{t.title}</span>
              <button onClick={onRemoveHandler}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Complete</button>
      </div>
    </div>
  );
}
