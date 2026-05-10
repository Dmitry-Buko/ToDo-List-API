import { useTodo } from "./provider/ToDoContext";
import Task from "./Task";

const ToDoList = () => {
  const { filteredTasks } = useTodo();

  return (
    <div className="tasks-list">
      {filteredTasks.length === 0 && <h1>Пусто 🤷🏼‍♂️</h1>}
      {filteredTasks.map((item) => (
        <Task key={item.id} task={item} />
      ))}
    </div>
  );
};

export default ToDoList;
