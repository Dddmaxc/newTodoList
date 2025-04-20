import { ChangeEvent, useState } from "react";

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

  return editMode ? (
    <input
      onBlur={ActivateViewMode}
      value={titleEdit}
      type="text"
      autoFocus
      onChange={onChangeHandler}
    />
  ) : (
    <span onDoubleClick={ActivateEditMode}>{title}</span>
  );
}
