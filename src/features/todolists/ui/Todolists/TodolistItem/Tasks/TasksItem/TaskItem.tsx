import { Checkbox, IconButton, ListItem } from "@mui/material";
import { EditableSpan } from "../../../../../../../common/components/EditableSpan/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "../../../../../../../common/hooks/useAppDispatch";
import {
  changeTaskStatusS,
  changeTaskTitleS,
  deleteTaskS,
  Task,
} from "../../../../../model/tasks-slice";
import { ChangeEvent } from "react";
import { getListItemSx } from "./tasksItem.style";

type Props = {
  task: Task;
  todolistId: string;
};

export const TaskItem = ({ task, todolistId }: Props) => {
  // useDispatch
  const dispatch = useAppDispatch();

  const deleteTask = () => {
    dispatch(deleteTaskS({ todolistId, taskId: task.id }));
  };

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeTaskStatusS({
        todolistId,
        taskId: task.id,
        isDone: e.currentTarget.checked,
      })
    );
  };

  const changeTaskTitle = (title: string) => {
    dispatch(changeTaskTitleS({ todolistId, taskId: task.id, title }));
  };

  return (
    <>
      <ListItem sx={getListItemSx(task.isDone)}>
        <div style={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Checkbox checked={task.isDone} onChange={changeTaskStatus} />
          <EditableSpan value={task.title} onChange={changeTaskTitle} />
        </div>
        <IconButton onClick={deleteTask}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
    </>
  );
};
