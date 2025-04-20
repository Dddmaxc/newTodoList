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
      setError("title is required");
    }
  };

  return (
    <>
      <div>
        <input
          value={newTaskTitle}
          onChange={onNewTitleOnChange}
          onKeyDown={onKeyDownHandler}
          className={error ? "error" : ""}
        />
        <button onClick={addTaskHandler}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
    </>
  );
}
