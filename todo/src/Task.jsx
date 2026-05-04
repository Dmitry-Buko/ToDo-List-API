import { useCallback, useState } from "react";
import { useTodo } from "../provider/ToDoContext";

const Task = ({ task }) => {
  const { deleteTask, isDoneToggler, editTitle } = useTodo();

  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(task.title);
  const [error, setError] = useState("");

  const validateAndSave = useCallback(
    (text) => {
      const success = editTitle(task.id, text, setError);
      if (success) {
        setError("");
        setIsEdit(false);
        return true;
      }
      return false;
    },
    [editTitle, task.id],
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      validateAndSave(editText);
    } else if (e.key === "Escape") {
      setIsEdit(false);
      setEditText(task.title);
      setError("");
    }
  };

  const toggleEdit = () => {
    if (isEdit) {
      validateAndSave(editText);
    } else {
      setIsEdit(true);
      setError("");
    }
  };

  return (
    <div className="task">
      <input
        type="checkbox"
        className="task__checkbox"
        checked={task.isDone}
        onChange={() => isDoneToggler(task.id)}
      />

      <div className="task__content">
        {isEdit ? (
          <div className="edit-wrapper">
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
            {error && (
              <div className="error-box">
                <span className="error-icon">⚠️</span>
                <span className="error-text">{error}</span>
              </div>
            )}
          </div>
        ) : (
          <p className={`task__text ${task.isDone ? "done" : ""}`}>{task.title}</p>
        )}
      </div>

      <div className="task__actions">
        <button onClick={toggleEdit} className="task__btn--edit">
          {isEdit ? "Сохранить ✅" : "Изменить ✍️"}
        </button>
        <button onClick={() => deleteTask(task.id)} className="task__btn--delete">
          Удалить 🗑
        </button>
      </div>
    </div>
  );
};

export default Task;
