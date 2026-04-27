import { useState } from "react";
import { useTodo } from "../provider/ToDoContext";

const InputTask = () => {
  const [text, setText] = useState("");
  const { addTask } = useTodo();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Новая задача..."
      />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default InputTask;