import { useDispatch, useSelector } from "react-redux";
import Task from "./Task";
import useFiltrationTask from "../RTK/hooks/useFiltrationTask";
import { useEffect } from "react";
import api from "../api/todoApi";
import { fetchTasks, setErrorTask } from "../RTK/taksSlice";

const ToDoList = () => {
  const { loading } = useSelector((state) => state.task);
  const filteredTask = useFiltrationTask();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await api.get("/todos");
        dispatch(fetchTasks(response.data?.data || []));
      } catch (err) {
        dispatch(
          setErrorTask(
            err.response?.data ||
              err.message ||
              "Не удалось загрузить твои задачи!",
          ),
        );
      }
    };
    const token = localStorage.getItem("token");
    if (token) loadTasks();
  }, []);

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
