import { useCallback, useState } from "react";
// import { useTodo } from "../context/ToDoContext";
import ErrorBox from "../../shared/ui/ErrorBox";
import { useDispatch, useSelector } from "react-redux";
import { addTodos } from "../RTK/taksSlice";

const InputTask = () => {
  // const { addTask, loadingAddTask } = useTodo();
  const [text, setText] = useState("");
  const [localError, setError] = useState("");
  const dispatch = useDispatch()
  const {loading, error} = useSelector(state => state.task)
// console.log('taskValue', taskValue);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if(!text.trim()){
        setError("ПУСТАЯ СТРОКА")
        return
      }
      dispatch(addTodos(text))
        setText("");
        setError("");
    },
    [dispatch, text],
  );

  return (
    <div className="todo__add-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => {
            if (localError) setError("");
            setText(e.target.value);
          }}
          className={`todo__input-task ${localError ? "error" : ""}`}
          placeholder="Новая задача..."
        />
        <button className="add-task-form__submit" type="submit">
          {loading ? "Добавление..." : "Добавить ➕"}
        </button>
      </form>
      {localError && <ErrorBox error={localError} />}
      {error && <ErrorBox error={error} />}
    </div>
  );
};

export default InputTask;
