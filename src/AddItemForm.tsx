import { ControlPoint } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

export type AddItemFormPropsType = {
  addItem: (titile: string) => void;
};

export function AddItemForm({ addItem }: AddItemFormPropsType) {
  let [newTaskTitle, setNewTaskTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const onNewTitleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };
  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      addTaskHandler();
    }
  };

  const addTaskHandler = () => {
    const trimmedTitle = newTaskTitle.trim();
    if (trimmedTitle) {
      addItem(trimmedTitle);
      setNewTaskTitle("");
      setError(null);
    } else {
      setError("Title is required");
    }
  };

  return (
    <>
      <div>
        <TextField
          variant={"filled"}
          label={"Type value"}
          color={"success"}
          value={newTaskTitle}
          onChange={onNewTitleOnChange}
          onKeyDown={onKeyDownHandler}
          error={!!error}
          helperText={error}
          style={{backgroundColor: "white"}}
        />
        <IconButton
          onClick={addTaskHandler}
          color={"success"}
        >
          <ControlPoint/>
        </IconButton>
      </div>
    </>
  );
}
