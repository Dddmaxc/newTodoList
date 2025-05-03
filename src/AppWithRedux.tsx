import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { AddItemFormMemo } from "./AddItemForm";
import "./App.css";
import { TaskType, TodoList } from "./TodoList";
import { Menu } from "@mui/icons-material";
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
} from "./state/todoList-reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRootState } from "./state/store";
import { useCallback } from "react";

export type FilterValueType = "all" | "active" | "completed";
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValueType;
};
export type TaskStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithRedux() {
  console.log("App");

  const dispatch = useDispatch();

  const todoLists = useSelector<AppRootState, TodolistType[]>(
    (state) => state.todoList
  );

  const changeTodoListTitle = useCallback(
    (newTitle: string, todolistId: string) => {
      const action = changeTodoListTitleAC(todolistId, newTitle);
      dispatch(action);
    },
    [dispatch]
  );

  const changeFilter = useCallback(
    (value: FilterValueType, todolistId: string) => {
      const action = changeTodoListFilterAC(todolistId, value);
      dispatch(action);
    },
    [dispatch]
  );

  const removeTodoList = useCallback(
    (todolistId: string) => {
      const action = removeTodoListAC(todolistId);
      dispatch(action);
    },
    [dispatch]
  );

  const addTodoList = useCallback(
    (title: string) => {
      const action = addTodoListAC(title);
      dispatch(action);
    },
    [dispatch]
  );

  return (
    <div className="App">
      <AppBar position="static" color={"secondary"}>
        <Toolbar className="appBar">
          <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
            <Menu />
          </IconButton>
          <Typography variant={"h6"}>News</Typography>
          <Button color={"inherit"}></Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemFormMemo addItem={addTodoList} />
        </Grid>
        <Grid container spacing={10}>
          {todoLists.map((t) => {
            return (
              <Grid key={t.id}>
                <Paper className="todoListFon">
                  <TodoList
                    id={t.id}
                    title={t.title}
                    changeFilter={changeFilter}
                    filter={t.filter}
                    removeTodoList={removeTodoList}
                    changeTodoListTitle={changeTodoListTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;
