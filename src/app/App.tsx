import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { useAppDispatch } from "../common/hooks/useAppDispatch";
import { useAppSelector } from "../common/hooks/useAppSelector";
import { CreateItemForm } from "../CreateItemForm";
import { selectTasks } from "../model/tasks-selectors";
import { selectTodolists } from "../model/todolists-selectors";
import { TodolistItem } from "../TodolistItem";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import CssBaseline from "@mui/material/CssBaseline";
import { containerSx } from "../TodolistItem.styles";
import { NavButton } from "../NavButton";
import { changeTaskStatusS, changeTaskTitleS, createTaskS, deleteTaskS } from "../model/tasks-slice";
import { changeTodolistFilterS, changeTodolistTitleS, createTodolistS, deleteTodolistS } from "../model/todolist-slice";
import { v1 } from "uuid";
import { toggleTheme } from "./appSlice";
import { getTheme } from "../common/theme/theme";
import {  selectThemeMode } from "./app-selectors";

export type Todolist = {
  id: string;
  title: string;
  filter: FilterValues;
};

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValues = "all" | "active" | "completed";

export type TasksState = Record<string, Array<Task>>;

export const App = () => {
  // useSelectors
  const todolists = useAppSelector(selectTodolists);
  const tasks = useAppSelector(selectTasks);
   const switchTheme = useAppSelector(selectThemeMode);
  // useDispatch
  const dispatch = useAppDispatch();
  // get theme
  const theme = getTheme(switchTheme)

  // Functions for todolist and tasks
const changeMode = () => {
  dispatch(toggleTheme({ switchTheme: switchTheme === "light" ? "dark" : "light" }));
};


  const changeFilter = (todolistId: string, filter: FilterValues) => {
    dispatch(changeTodolistFilterS({  todolistId, filter }));
  };

  const createTodolist = (title: string) => {
    dispatch(createTodolistS({todolistid: v1(),title}));
  };

  const deleteTodolist = (todolistId: string) => {
    dispatch(deleteTodolistS({  todolistId }));
  };

  const changeTodolistTitle = (todolistId: string, title: string) => {
    dispatch(changeTodolistTitleS({  todolistId, title }));
  };

  const deleteTask = (todolistId: string, taskId: string) => {
    dispatch(deleteTaskS({ todolistId, taskId }));
  };

  const createTask = (todolistId: string, title: string) => {
    dispatch(createTaskS({ todolistId, title }));
  };

  const changeTaskStatus = (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => {
    dispatch(changeTaskStatusS({ todolistId, taskId, isDone }));
  };

  const changeTaskTitle = (
    todolistId: string,
    taskId: string,
    title: string
  ) => {
    dispatch(changeTaskTitleS({ todolistId, taskId, title }));
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={"app"}>
        <CssBaseline />
        <AppBar position="static" sx={{ mb: "30px" }}>
          <Toolbar>
            <Container maxWidth={"lg"} sx={containerSx}>
              <IconButton color="inherit">
                <MenuIcon />
              </IconButton>
              <div>
                <NavButton>Sign in</NavButton>
                <NavButton>Sign up</NavButton>
                <NavButton background={theme.palette.primary.dark}>
                  Faq
                </NavButton>
                <Switch color={"default"} onChange={changeMode} />
              </div>
            </Container>
          </Toolbar>
        </AppBar>
        <Container maxWidth={"lg"}>
          <Grid container sx={{ mb: "30px" }}>
            <CreateItemForm onCreateItem={createTodolist} />
          </Grid>
          <Grid container spacing={4}>
            {todolists.map((todolist) => {
              const todolistTasks = tasks[todolist.id];
              let filteredTasks = todolistTasks;
              if (todolist.filter === "active") {
                filteredTasks = todolistTasks.filter((task) => !task.isDone);
              }
              if (todolist.filter === "completed") {
                filteredTasks = todolistTasks.filter((task) => task.isDone);
              }

              return (
                <Grid key={todolist.id}>
                  <Paper sx={{ p: "0 20px 20px 20px" }}>
                    <TodolistItem
                      todolist={todolist}
                      tasks={filteredTasks}
                      deleteTask={deleteTask}
                      changeFilter={changeFilter}
                      createTask={createTask}
                      changeTaskStatus={changeTaskStatus}
                      deleteTodolist={deleteTodolist}
                      changeTaskTitle={changeTaskTitle}
                      changeTodolistTitle={changeTodolistTitle}
                    />
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
};
