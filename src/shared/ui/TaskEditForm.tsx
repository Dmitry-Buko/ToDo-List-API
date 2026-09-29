import { KeyboardEventHandler } from "react";

interface ITaskEditFormProps {
  editText: string;
  setEditText: (value: string) => void;
  error: string;
  setError: (message: string) => void;
  handleKeyDown: KeyboardEventHandler<HTMLInputElement>;
}

const TaskEditForm = ({
  editText,
  setEditText,
  error,
  setError,
  handleKeyDown,
}: ITaskEditFormProps) => {
  return (
    <input
      value={editText}
      onChange={(e) => {
        setEditText(e.target.value);
        if (error) setError("");
      }}
      onKeyDown={handleKeyDown}
      className={`edit-wrapper__input ${error ? "error" : ""}`}
      autoFocus
    />
  );
};

export default TaskEditForm;
