import { useCallback, useState } from "react";
import { useTodo } from "./provider/ToDoContext";

const InputTask = () => {
  const { addTask, loadingAddTask } = useTodo();
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const success = await addTask(text, setError);
      if (success) {
        setText("");
        setError("");
      }
      setText("");
    },
    [addTask, text],
  );

  return (
    <div className="todo__add-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => {
            if (error) setError("");
            setText(e.target.value);
          }}
          className={`todo__input-task ${error ? "error" : ""}`}
          placeholder="Новая задача..."
        />
        <button className="add-task-form__submit" type="submit">
          {loadingAddTask ? 'Добавление...' : 'Добавить ➕'}
        </button>
      </form>
      {error && (
        <div className="error-box">
          <span className="error-icon">⚠️</span>
          <span className="error-text">{error}</span>
        </div>
      )}
    </div>
  );
};

export default InputTask;
