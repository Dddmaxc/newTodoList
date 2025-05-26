import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import { TodolistItem } from "./TodolistItem/TodolistItem"
import { useAppSelector } from "../../../../common/hooks/useAppSelector"
import { selectTodolists } from "../../model/todolists-selectors"

export const Todolist = () => {
  // useSelectors
  const todolists = useAppSelector(selectTodolists)

  return (
    <>
      {todolists.map((todolist) => {
        return (
          <Grid key={todolist.id}>
            <Paper sx={{ p: "0 20px 20px 20px" }}>
              <TodolistItem todolist={todolist} />
            </Paper>
          </Grid>
        )
      })}
    </>
  )
}
