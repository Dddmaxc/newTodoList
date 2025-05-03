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
import { AddItemForm } from "./AddItemForm";
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
  const dispatch = useDispatch();
  const todoLists = useSelector<AppRootState, TodolistType[]>(
    (state) => state.todoList
  );
  const tasks = useSelector<AppRootState, TaskStateType>(
    (state) => state.tasks
  );

  const changeTodoListTitle = (newTitle: string, todolistId: string) => {
    const action = changeTodoListTitleAC(todolistId, newTitle);
    dispatch(action);
  };

  const changeFilter = (value: FilterValueType, todolistId: string) => {
    const action = changeTodoListFilterAC(todolistId, value);
    dispatch(action);
  };

  const removeTodoList = (todolistId: string) => {
    const action = removeTodoListAC(todolistId);
    dispatch(action);
  };

  const addTodoList = (title: string) => {
    const action = addTodoListAC(title);
    dispatch(action);
  };

  return (
    <div className="App">
      <AppBar position="static" color={"secondary"}>
        <Toolbar>
          <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
            <Menu />
          </IconButton>
          <Typography variant={"h6"}>News</Typography>
          <Button color={"inherit"}></Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodoList} />
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
