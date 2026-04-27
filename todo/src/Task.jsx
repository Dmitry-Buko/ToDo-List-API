import { useState } from "react";
import { useTodo } from "../provider/ToDoContext";

const Task = ({ task }) => {
  const { deleteTask, isDoneToggler, editTitle } = useTodo();

  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const editTask = (e) => {
    if (e.key === "Enter") {
      editTitle(task.id, editText);
      setEditText('')
      setIsEdit((isEdit) => !isEdit)
    }
  };

  return (
    <div className="tasks-list__item">
      <input
        type="checkbox"
        checked={task.isDone}
        onChange={() => isDoneToggler(task.id)}
      />
      {isEdit ? (
        <input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => editTask(e)}
        />
      ) : (
        <p className={task.isDone ? "done" : ""}>{task.title}</p>
      )}
      <button onClick={() => setIsEdit((isEdit) => !isEdit)}>Изменить✍🏼</button>
      <button onClick={() => deleteTask(task.id)}>Удалить🗑</button>
    </div>
  );
};

export default Task;
