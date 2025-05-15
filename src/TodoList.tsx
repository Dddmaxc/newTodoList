import { AddItemForm } from "./model/AddItemForm";
import { EditableSpun } from "./EditableSpun";
import { Button, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import s from "./Todolist.module.css";
import { FilterValueType } from "./app/AppWithRedux";
import { Tasks } from "./Tasks";
import { useAppDispatch } from "./common/hooks/useAppDispatch";
import { addTaskS } from "./model/tasks-reducerCopy";

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

export const TodoList = (props: PropsType) => {
  console.log("TodoList");

  const dispatch = useAppDispatch();

  const onAllClickHandler = () => props.changeFilter("all", props.id);

  const onActiveClickHandler = () => props.changeFilter("active", props.id);

  const onCompletedClickHandler = () =>
    props.changeFilter("completed", props.id);

  const removeTodoList = () => {
    props.removeTodoList(props.id);
  };

  const AddTask = (title: string) => {
    dispatch(addTaskS({ todolistId: props.id, title: title }));
  };

  const changeTodoListTitle = (newTitle: string) => {
    props.changeTodoListTitle(newTitle, props.id);
  };

  return (
    <div className={s.containet}>
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
};
