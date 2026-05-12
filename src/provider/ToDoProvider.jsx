import { useState, useCallback, useMemo, useEffect } from "react";
import { ToDoContext } from "./ToDoContext";
import api from "../api/todoApi";

export const ToDoProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false); //флаг загрузки
  const [success, setSuccess] = useState(""); //успех загрузки
  const [error, setError] = useState(""); //ошибка при загрузке

  console.log("tasks: ", tasks);

  //начальная Загрузка тасок
  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      try {
        const response = await api.get("/todos");
        // console.log("response:", response.data);
        setTasks(response.data);
        if (response.status === 200) setSuccess("Загрузка удалась!");
      } catch (error) {
        console.log("Ошибка:", error.response?.data || error.message);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  //добавление тасок в localStorage -- удалить!!!
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  //кол-во активных
  const activeCount = useMemo(() => {
    let count = 0;
    tasks.forEach((el) => {
      if (!el.isCompleted) count++;
    });
    return count;
  }, [tasks]);

  //фильтрация
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "active":
        return tasks.filter((item) => !item.isCompleted);
      case "completed":
        return tasks.filter((item) => item.isCompleted);
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

  //добавление задачи +++++++++++++
  const addTask = useCallback(
    async (title, onError) => {
      const result = validateText(title);
      if (!result.isValid) {
        onError?.(result.error);
        return false;
      }
      try {
        const response = await api.post("/todos", {
          title: result.trimmedText,
        });
        setTasks((prev) => [...prev, response.data]);
      } catch (error) {
        setError(error);
        console.log(error);
      }
    },
    [validateText],
  );

  //изменение задачи
  const editTitle = useCallback(
    async (id, newTitle, onError) => {
      const result = validateText(newTitle);
      if (!result.isValid) {
        onError?.(result.error);
        return false;
      }
      setLoading(true);
      try {
        const response = await api.patch(`/todos/${id}`, {
          title: newTitle,
        });
        console.log('response: ', response);
        
        setTasks((prev) =>
          prev.map((task) =>
            task.id === id ? { ...task, title: response.data.title } : task,
          ),
        );
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
      return true;
    },
    [validateText],
  );
  //удаление задачи +++++++++
  const deleteTask = useCallback(async (id) => {
    setLoading(true);
    try {
      const response = await api.delete(`/todos/${id}`);
      // console.log('delete response: ', response);
      setTasks((prev) => prev.filter((task) => task.id !== response.data?.id));
    } catch (error) {
      console.log("Ошибка:", error.response?.data?.message || error.message);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  //переключатель выполнено или нет ++++++++++++
  const isDoneToggler = useCallback(async (id) => {
    setLoading(true);
    try {
      const response = await api.patch(`/todos/${id}/isCompleted`);
      setTasks((prev) =>
        prev.map((task) =>
          task.id === response.data[0].id
            ? { ...task, isCompleted: response.data[0].isCompleted }
            : task,
        ),
      );
    } catch (error) {
      console.log("Ошибка:", error.response?.data || error.message);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  //очистка выполненных (в конце) +++++++++++++++++++
  const clearCompeted = useCallback(async () => {
    const completedTask = tasks.filter((item) => item.isCompleted);
    if (completedTask.length === 0) return;
    setLoading(true);
    try {
      const deletePromise = completedTask.map((taks) => {
        api.delete(`/todos/${taks.id}`);
      });
      await Promise.all(deletePromise);
      setTasks((prev) => prev.filter((task) => !task.isCompleted));
    } catch (error) {
      console.log("Ошибка:", error.response?.data?.message || error.message);
      setError(error);
    } finally {
      setLoading(true);
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
    ],
  );

  return <ToDoContext.Provider value={value}>{children}</ToDoContext.Provider>;
};
