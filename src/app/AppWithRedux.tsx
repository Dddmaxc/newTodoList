import {
  AppBar,
  Container,
  Grid,
  IconButton,
  Paper,
  Switch,
  Theme,
  Toolbar,
  Typography,
} from "@mui/material";
import { AddItemForm } from "../model/AddItemForm";
import "./App.css";
import { TaskType, TodoList } from "../TodoList";
import { Brightness6Outlined, Menu } from "@mui/icons-material";
import { useState } from "react";
import { todolistGridContainer, typographyStyle } from "../todolist.styles";
import { MenuButton } from "../MenuButton";
import { useTheme } from "@mui/material/styles";
import { useAppSelector } from "../common/hooks/useAppSelector";
import { useAppDispatch } from "../common/hooks/useAppDispatch";
import { selectTodolists } from "../model/todolists-selectors";
import {
  addTodoListS,
  changeTodoListFilterS,
  changeTodoListTitleS,
  removeTodoListS,
} from "../model/todolist-reducerCopy";
import { v1 } from "uuid";

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
  const [switchTheme, setSwitchTheme] = useState<boolean>(false);
  console.log("App");

  const dispatch = useAppDispatch(); // useDispatch
  const theme = useTheme<Theme>(); // useTheme
  // useSelect
  const todoLists = useAppSelector(selectTodolists);

  const changeTodoListTitle = (title: string, todolistId: string) => {
    const action = changeTodoListTitleS({ todolistId, title });
    dispatch(action);
  };

  const changeFilter = (filter: FilterValueType, todolistId: string) => {
    const action = changeTodoListFilterS({ todolistId, filter });
    dispatch(action);
  };

  const removeTodoList = (todolistId: string) => {
    const action = removeTodoListS({ todolistId });
    dispatch(action);
  };

  const addTodoList = (title: string) => {
    const action = addTodoListS({ todolistid: v1(), title });
    dispatch(action);
  };

  const switchThemeFunction = () => {
    setSwitchTheme((prev) => !prev);
  };

  const mainColor = theme.palette.extra.extra7;
  const bgSwitchTheme = !switchTheme ? mainColor : "#00BCD4";
  // const mainColorBlack = theme.palette.extra.extra3;
  // const mainColorWhite = theme.palette.extra.extra8;

  return (
    <div className="App">
      <AppBar position="static" color={!switchTheme ? "secondary" : "default"}>
        <Toolbar className="appBar">
          <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={typographyStyle}>
            News
          </Typography>
          <div style={{ display: "flex", gap: "10px" }}>
            <MenuButton
              color={switchTheme ? "primary" : "warning"}
              background={bgSwitchTheme}
            >
              LogOut
            </MenuButton>
            <MenuButton background={bgSwitchTheme}>LogIn</MenuButton>
            <MenuButton background={bgSwitchTheme}>FAQ</MenuButton>
            <Switch
              color={switchTheme ? "secondary" : "info"}
              onClick={switchThemeFunction}
            ></Switch>
          </div>

          {/* <Brightness6Outlined >
          </Brightness6Outlined> */}
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container sx={todolistGridContainer}>
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
