import { useCallback, useState } from "react";
import ErrorBox from "../../shared/ui/ErrorBox";
import TaskText from "./TaskText";
import TaskEditForm from "./TaskEditForm";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodos, editTodos, togglerTodos } from "../RTK/taksSlice";

const Task = ({ task }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(task.title || "");
  const [localError, setError] = useState("");

  const { loading } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  const validateAndSave = useCallback(
    async (text) => {
      if (!text.trim()) {
        setError("ПУСТАЯ СТРОКА Task.js");
        return;
      }
      await dispatch(editTodos({ id: task.id, newTitle: text }));
      setError("");
      setIsEdit(false);
      setEditText(text);
      return false;
    },
    [dispatch, task.id],
  );

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      await validateAndSave(editText);
    } else if (e.key === "Escape") {
      setIsEdit(false);
      setEditText(task.title);
      setError("");
    }
  };

  const toggleEdit = async () => {
    if (isEdit) {
      await validateAndSave(editText);
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
        checked={!!task.completed}
        onChange={() => dispatch(togglerTodos(task.id))}
      />

      <div className="task__content">
        {isEdit ? (
          <div className="edit-wrapper">
            <TaskEditForm
              editText={editText}
              setEditText={setEditText}
              error={localError}
              setError={setError}
              handleKeyDown={handleKeyDown}
            />
            {localError && <ErrorBox error={localError} />}
          </div>
        ) : (
          <TaskText task={task} />
        )}
      </div>

      <div className="task__actions">
        <button
          onClick={toggleEdit}
          disabled={loading}
          className="task__btn--edit"
        >
          {isEdit ? "Сохранить ✅" : loading ? "Изменение.." : "Изменить ✍️"}
        </button>

        <button
          onClick={() => dispatch(deleteTodos(task.id))}
          disabled={loading}
          className="task__btn--delete"
        >
          {loading ? "Удаление.." : "Удалить 🗑"}
        </button>
      </div>
    </div>
  );
};

export default Task;
