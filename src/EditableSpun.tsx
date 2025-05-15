import { TextField } from "@mui/material";
import { ChangeEvent, useCallback, useState } from "react";
import s from "./EditableSpun.module.css";
import React from "react";

type EditableSpunTypeProps = {
  title: string;
  onChange: (newValue: string) => void;
};

export function EditableSpun({ title, onChange }: EditableSpunTypeProps) {
  console.log("EditableSpun");

  const [editMode, setEditMode] = useState<boolean>(false);
  const [titleEdit, setTitleEdit] = useState<string>(title);

  const ActivateEditMode = () => setEditMode((prew) => !prew);
  const ActivateViewMode = () => {
    setEditMode(false);
    onChange(titleEdit);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setTitleEdit(e.currentTarget.value);

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // нажатия через Enter +
      onChange(titleEdit);
      setEditMode(false); //  + выходим с EditMode
    }
  };

  return editMode ? (
    <div className={s.textField}>
      <TextField
        onKeyDown={onKeyDownHandler}
        onBlur={ActivateViewMode}
        value={titleEdit}
        type="text"
        autoFocus
        onChange={onChangeHandler}
        variant={"filled"}
        color={"secondary"}
      />
    </div>
  ) : (
    <span onDoubleClick={ActivateEditMode}>{title}</span>
  );
}
