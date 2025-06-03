import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm"
import Container from "@mui/material/Container"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { createTodolistS } from "@/features/todolists/model/todolist-slice"
import { v1 } from "uuid"
import { Todolist } from "@/features/todolists/ui/Todolists/Todolists"
import Grid from "@mui/material/Grid2"

export const Main = () => {
  // useDispatch
  const dispatch = useAppDispatch()
  // get theme

  // Functions for todolist and tasks
  const createTodolist = (title: string) => {
    dispatch(createTodolistS( title ))
  }

  return (
    <>
      <Container maxWidth={"lg"}>
        <Grid container sx={{ mb: "30px" }}>
          <CreateItemForm onCreateItem={createTodolist} />
        </Grid>
        <Grid container spacing={4}>
          <Todolist />
        </Grid>
      </Container>
    </>
  )
}
