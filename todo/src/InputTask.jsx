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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Новая задача..."
        />
        <button type="submit">Добавить</button>
      </form>
      
    </div>
  );
};

export default InputTask;
