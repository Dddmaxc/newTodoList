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
debugger
  const [editMode, setEditMode] = useState<boolean>(false);
  const [titleEdit, setTitleEdit] = useState<string>(title);

  const ActivateEditMode = useCallback(() => setEditMode((prew) => !prew), []);
  const ActivateViewMode = useCallback(() => {
    setEditMode(false);
    onChange(titleEdit);
  }, [onChange, titleEdit]);

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setTitleEdit(e.currentTarget.value),
    [setTitleEdit]
  );

  const onKeyDownHandler = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        // нажатия через Enter +
        onChange(titleEdit);
        setEditMode(false); //  + выходим с EditMode
      }
    },
    [onChange, titleEdit]
  );

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

export const EditableSpunMemo = React.memo(EditableSpun);
