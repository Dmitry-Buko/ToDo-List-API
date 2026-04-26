import { useTodo } from "../provider/ToDoContext";

const Task = ({ task }) => {
  const { deleteTask, isDoneToggler } = useTodo();

  return (
    <div>
      <input
        type="checkbox"
        checked={task.isDone}
        onChange={() => isDoneToggler(task.id)}
      />
      <p>{task.title}</p>
      <button>Изменить✍🏼</button>
      <button onClick={() => deleteTask(task.id)}>Удалить🗑</button>
    </div>
  );
};

export default Task;
