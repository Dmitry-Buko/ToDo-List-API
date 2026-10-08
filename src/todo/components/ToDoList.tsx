import { useGetTodosQuery } from "@/features/todos/taskApi";
import { selectCurrentFilter } from "@/app/store";
import { useAppSelector } from "@/app/hooks";
import Task from "./Task";
import type { ITodo } from "@/types/types";

const ToDoList = () => {
  const { data: tasks = [], isLoading, isError } = useGetTodosQuery();
  const filter = useAppSelector(selectCurrentFilter);
  let filteredTasks: ITodo[];

  switch (filter) {
    case "active":
      filteredTasks = tasks.filter((task) => !task.completed);
      break;
    case "completed":
      filteredTasks = tasks.filter((task) => task.completed);
      break;
    default:
      filteredTasks = tasks;
  }

  if (isLoading) return <h1 className="nothing">Загрузка...</h1>;
  if (isError)
    return <h2 className="nothing">Не удалось загрузить твои задачи!</h2>;
  if (tasks.length === 0)
    return <h2 className="nothing">Задач нет. Добавьте первую!🔥</h2>;

  return (
    <div className="tasks-list">
      {filteredTasks.map((item) => (
        <Task key={item.id} task={item} />
      ))}
    </div>
  );
};

export default ToDoList;
