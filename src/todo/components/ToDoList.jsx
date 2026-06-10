import { useTodo } from "../context/ToDoContext";
import Task from "./Task";

const ToDoList = () => {
  const { filteredTasks, loading } = useTodo();

  if (loading) return <h1 className="nothing">Загрузка...</h1>
  if (filteredTasks.length === 0) return <h2 className="nothing">Задач нет. Добавьте первую!🔥</h2>;

  return (
    <div className="tasks-list">
      {filteredTasks.map((item) => (
        <Task key={item.id} task={item} />
      ))}
    </div>
  );
};

export default ToDoList;
