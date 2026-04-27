import { useTodo } from "../provider/ToDoContext";
import Task from "./Task";

const ToDoList = () => {
  const { tasks } = useTodo();

  return (
    <div className="tasks-list">
      {tasks.length === 0 && <h1>Пусто</h1>}
      {tasks.map((item) => (
        <Task key={item.id} task={item} />
      ))}
    </div>
  );
};

export default ToDoList;
