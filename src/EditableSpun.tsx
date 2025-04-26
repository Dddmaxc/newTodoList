import { TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import s from "./EditableSpun.module.css"

type EditableSpunTypeProps = {
  title: string;
  onChange: (newValue: string) => void;
};

export function EditableSpun({ title, onChange }: EditableSpunTypeProps) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [titleEdit, setTitleEdit] = useState<string>(title);

  const ActivateEditMode = () => setEditMode(!editMode);
  const ActivateViewMode = () => {
    setEditMode(!editMode);
    onChange(titleEdit)
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setTitleEdit(e.currentTarget.value);

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { // нажатия через Enter + 
      onChange(titleEdit) 
      setEditMode(false); //  + выходим с EditMode
    }
  };

  return editMode ? (
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
  ) : (
    <span onDoubleClick={ActivateEditMode}>{title}</span>
  );
}
