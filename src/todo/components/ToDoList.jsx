import { useSelector } from "react-redux";
import Task from "./Task";
import useFiltrationTask from "../RTK/hooks/useFiltrationTask";

const ToDoList = () => {
  const { loading } = useSelector((state) => state.task);
  const filteredTask = useFiltrationTask();

  if (loading) return <h1 className="nothing">Загрузка...</h1>;
  if (filteredTask.length === 0)
    return <h2 className="nothing">Задач нет. Добавьте первую!🔥</h2>;

  return (
    <div className="tasks-list">
      {filteredTask.map((item) => (
        <Task key={item.id} task={item} />
      ))}
    </div>
  );
};

export default ToDoList;
