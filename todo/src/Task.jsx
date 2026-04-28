import { useState } from "react";
import { useTodo } from "../provider/ToDoContext";

const Task = ({ task }) => {
  const { deleteTask, isDoneToggler, editTitle } = useTodo();

  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(task.title);
  const [error, setError] = useState("");

  const validateAndSave = (text) => {
    const trimmed = text.trim();
    if (!trimmed) {
      setError("Заголовок задачи не может быть пустым");
      return false;
    }
    editTitle(task.id, trimmed);
    setError("");
    return true;
  };
  
  const editTask = (e) => {
    if (e.key === "Enter") {
      if (validateAndSave(editText)) {
        setIsEdit(false);
      }
    } else if (e.key === "Escape") {
      setIsEdit(false);
      setEditText(task.title);
      setError("");
    }
  };

  const editOrSaveData = () => {
    if (!isEdit) {
      setIsEdit(true);
    } else {
      if (validateAndSave(editText)) {
        setIsEdit(false);
      }
    }
  };

  return (
    <div className="tasks-list__item">
      <input
        type="checkbox"
        checked={task.isDone}
        onChange={() => isDoneToggler(task.id)}
      />
      <div className="task-content">
        {isEdit ? (
          <div className="edit-wrapper">
            <input
              value={editText}
              onChange={(e) => {
                setEditText(e.target.value);
                if (error) setError("");
              }}
              onKeyDown={editTask}
              className={`edit-input ${error ? "error" : ""}`}
            />
            {error && (
              <div className="error-box">
                <span className="error-icon">⚠️</span>
                <span className="error-text">{error}</span>
              </div>
            )}
          </div>
        ) : (
          <p className={task.isDone ? "done" : ""}>{task.title}</p>
        )}
      </div>
      <div className="task-buttons">
        <button onClick={editOrSaveData} className="edit-btn">
          {isEdit ? "Сохранить ✅" : "Изменить ✍️"}
        </button>
        <button onClick={() => deleteTask(task.id)} className="delete-btn">
          Удалить 🗑
        </button>
      </div>
    </div>
  );
};

export default Task;