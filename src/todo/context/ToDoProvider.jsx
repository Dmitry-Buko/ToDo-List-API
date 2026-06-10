import { useState, useCallback, useMemo, useEffect } from "react";
import { ToDoContext } from "./ToDoContext";
import api from "../api/todoApi";

export const ToDoProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false); //флаг загрузки
  const [loadingAddTask, setLoadingAddTask] = useState(false); //флаг загрузки новая таска
  const [loadingChangeTask, setLoadingChangeTask] = useState(false); //флаг загрузки изменение таски
  const [loadingDeleteTask, setLoadingDeleteTask] = useState(false); //флаг загрузки изменение таски
  const [error, setError] = useState(""); //ошибка при загрузке
  // const [success, setSuccess] = useState(""); //успех загрузки
  // console.log("tasks:", tasks);

  //API начальная Загрузка тасок
  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);

      try {
        const response = await api.get("/todos");
        setTasks(response.data.data || []);
        if (response.status === 200) setSuccess("Загрузка удалась!");
      } catch (error) {
        setError(
          "Ошибка:",
          error.response?.data ||
            error.message ||
            "Не удалось загрузить твои задачи!",
        );
      } finally {
        setLoading(false);
      }
    };
    const token = localStorage.getItem("token");
    if (token) loadTasks();
  }, []);
  //кол-во активных
  const activeCount = useMemo(() => {
    let count = 0;
    console.log("tasks", tasks);

    tasks?.forEach((el) => {
      if (!el.completed) count++;
    });
    return count;
  }, [tasks]);
  //фильтрация
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "active":
        return tasks.filter((item) => !item.completed);
      case "completed":
        return tasks.filter((item) => item.completed);
      default:
        return tasks;
    }
  }, [filter, tasks]);

  //валидация
  const validateText = useCallback((text) => {
    const trimmed = text.trim();
    if (!trimmed) {
      return { isValid: false, error: "Задача не может быть пустой!" };
    }
    return { isValid: true, trimmedText: trimmed.toString() };
  }, []);

  //API добавление задачи
  const addTask = useCallback(
    async (title, onError) => {
      setLoadingAddTask(true);
      const result = validateText(title);
      if (!result.isValid) {
        onError?.(result.error);
        setLoadingAddTask(false);
        return false;
      }
      try {
        const response = await api.post("/todos", {
          title: result.trimmedText,
          description: null,
        });
        const newTask =
          response.data?.data || response.data?.todo || response.data;
        setTasks((prev) => [...prev, newTask]);
      } catch (error) {
        const errorMessage =
          error.response?.data?.errors?.[0]?.msg || "Произошла ошибка";
        setError(errorMessage);
      } finally {
        setLoadingAddTask(false);
      }
    },
    [validateText],
  );

  //изменение задачи
  const editTitle = useCallback(
    async (id, newTitle, onError) => {
      setLoadingChangeTask(true);
      const result = validateText(newTitle);
      if (!result.isValid) {
        onError?.(result.error);
        setLoadingChangeTask(false);
        return false;
      }
      try {
        const response = await api.patch(`/todos/${id}`, {
          title: newTitle,
          description: null,
          completed: false,
        });
        if (response.status === 200) {
          setTasks((prev) =>
            prev.map((task) =>
              task.id === id ? { ...task, title: response.data.title } : task,
            ),
          );
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.errors?.[0]?.msg || "Произошла ошибка";
        setError(errorMessage);
      } finally {
        setLoadingChangeTask(false);
      }
      return true;
    },
    [validateText],
  );

  //удаление задачи
  const deleteTask = useCallback(async (id) => {
    setLoadingDeleteTask(true);
    try {
      const response = await api.delete(`/todos/${id}`);
      // console.log("delete response: ", response);
      if (response.status === 204) {
        setTasks((prev) => prev.filter((task) => task.id !== id));
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Ошибка удаления";
      setError(errorMessage);
    } finally {
      setLoadingDeleteTask(false);
    }
  }, []);

  //переключатель выполнено или нет
  const isDoneToggler = useCallback(async (id) => {
    setLoading(true);
    try {
      const response = await api.patch(`/todos/${id}/toggle`);
      if (response.status === 200 && response.data) {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === id
              ? { ...task, completed: response.data.completed }
              : task,
          ),
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Ошибка переключения";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  //очистка выполненных (в конце)
  const clearCompeted = useCallback(async () => {
    const completedTask = tasks?.filter((item) => item.completed);
    if (completedTask.length === 0) return;
    setLoading(true);
    try {
      const deletePromise = completedTask.map((taks) => {
        api.delete(`/todos/${taks.id}`);
      });
      await Promise.all(deletePromise);
      setTasks((prev) => prev.filter((task) => !task.completed));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Ошибка переключения";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [tasks]);

  const value = useMemo(
    () => ({
      tasks,
      addTask,
      deleteTask,
      isDoneToggler,
      editTitle,
      filteredTasks,
      filter,
      setFilter,
      activeCount,
      clearCompeted,
      loading,
      loadingAddTask,
      loadingChangeTask,
      loadingDeleteTask,
      error,
    }),
    [
      tasks,
      addTask,
      deleteTask,
      isDoneToggler,
      editTitle,
      filteredTasks,
      filter,
      setFilter,
      activeCount,
      clearCompeted,
      loading,
      loadingAddTask,
      loadingChangeTask,
      loadingDeleteTask,
      error,
    ],
  );

  return <ToDoContext.Provider value={value}>{children}</ToDoContext.Provider>;
};
