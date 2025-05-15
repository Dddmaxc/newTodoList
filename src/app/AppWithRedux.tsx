import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Switch,
  Theme,
  Toolbar,
  Typography,
} from "@mui/material";
import { AddItemFormMemo } from "../model/AddItemForm";
import "./App.css";
import { TaskType, TodoList } from "../TodoList";
import { Brightness6Outlined, Menu } from "@mui/icons-material";
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
} from "../model/todoList-reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { use, useCallback, useState } from "react";
import { todolistGridContainer, typographyStyle } from "../todolist.styles";
import { MenuButton } from "../MenuButton";
import { useTheme } from "@mui/material/styles";
import { useAppSelector } from "../common/hooks/useAppSelector";
import { useAppDispatch } from "../common/hooks/useAppDispatch";
import { selectTodolists } from "../model/todolists-selectors";

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
  const theme = useTheme<Theme>();
  // useSelect
  const todoLists = useAppSelector(selectTodolists);

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

  const switchThemeFunction = () => {
    setSwitchTheme((prev) => !prev);
  };

  const mainColor = theme.palette.extra.extra7;
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
              background={!switchTheme ? mainColor : "#00BCD4"}
            >
              LogOut
            </MenuButton>
            <MenuButton background={!switchTheme ? mainColor : "#00BCD4"}>
              LogIn
            </MenuButton>
            <MenuButton background={!switchTheme ? mainColor : "#00BCD4"}>
              FAQ
            </MenuButton>
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
