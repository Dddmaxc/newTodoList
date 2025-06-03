import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import { TodolistItem } from "./TodolistItem/TodolistItem"
import { useAppSelector } from "../../../../common/hooks/useAppSelector"
import { fetchTodolistTC, selectTodolists } from "../../model/todolist-slice"
import { useEffect } from "react"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"


export const Todolist = () => {
  // useSelectors
  const todolists = useAppSelector(selectTodolists)
  // useDispatch
  const dispatch = useAppDispatch()
  // useEffect
   useEffect(() => {
      dispatch(fetchTodolistTC())
    }, [])

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
