import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  changeTodolistTitleS,
  deleteTodolistS,
  Todolist,
} from "@/features/todolists/model//todolist-slice";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import s from "./todolistTitle.module.css"

type PropsTodolistTitleType = {
  todolist: Todolist;
};

export const TodolistTitle = ({ todolist }: PropsTodolistTitleType) => {
  const { id, title } = todolist;
  // useDispatch
  const dispatch = useAppDispatch();

  const deleteTodolist = () => {
    dispatch(deleteTodolistS({ todolistId: id }));
  };

  const changeTodolistTitle = (title: string) => {
    dispatch(changeTodolistTitleS({ todolistId: id, title }));
  };

  return (
    <>
      <div className={s.container}>
        <h3>
          <EditableSpan value={title} onChange={changeTodolistTitle} />
        </h3>
        <IconButton onClick={deleteTodolist}>
          <DeleteIcon />
        </IconButton>
      </div>
    </>
  );
};
