import { ControlPoint } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import React, { useCallback } from "react";
import { ChangeEvent, useState } from "react";

export type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export const AddItemForm = ({ addItem }: AddItemFormPropsType) => {
  console.log("AddItemForm");
  let [newTaskTitle, setNewTaskTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const onNewTitleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setNewTaskTitle(e.currentTarget.value);
    },
    []
  );

  const onKeyDownHandler = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      setError(null);
      if (e.key === "Enter") {
        addTaskHandler();
      }
    },
    [newTaskTitle]
  );

  const addTaskHandler = useCallback(() => {
    const trimmedTitle = newTaskTitle.trim();
    if (trimmedTitle) {
      addItem(trimmedTitle);
      setNewTaskTitle("");
      setError(null);
    } else {
      setError("Title is required");
    }
  }, [addItem, newTaskTitle]);

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
          sx={{ backgroundColor: "white" }}
        />
        <IconButton onClick={addTaskHandler} color={"success"}>
          <ControlPoint />
        </IconButton>
      </div>
    </>
  );
};

export const AddItemFormMemo = React.memo(AddItemForm);
