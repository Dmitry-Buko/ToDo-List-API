import { useCallback, useState } from "react";
import ErrorBox from "../../shared/ui/ErrorBox";
import { useDispatch, useSelector } from "react-redux";
import { addTodos } from "../RTK/taksSlice";
import { addInputValue, setInputError } from "../RTK/inputSlice";

const InputTask = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.task);
  const { inputValue, inputError } = useSelector((state) => state.text);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!inputValue.trim()) {
        dispatch(setInputError("ПУСТАЯ СТРОКА"));
        return;
      }
      dispatch(addTodos(inputValue));
      dispatch(setInputError(""));
      dispatch(addInputValue(""));
    },
    [dispatch, inputValue],
  );

  return (
    <div className="todo__add-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            if (inputError) dispatch(setInputError(""));
            dispatch(addInputValue(e.target.value));
          }}
          className={`todo__input-task ${inputError ? "error" : ""}`}
          placeholder="Новая задача..."
        />
        <button className="add-task-form__submit" type="submit">
          {loading ? "Добавление..." : "Добавить ➕"}
        </button>
      </form>
      {inputError && <ErrorBox error={inputError} />}
    </div>
  );
};

export default InputTask;
