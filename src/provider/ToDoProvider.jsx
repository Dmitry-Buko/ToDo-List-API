import axios from "axios";
import { useState, useCallback, useMemo, useEffect } from "react";
import { ToDoContext } from "./ToDoContext";
import api from "../api/todoApi";

export const ToDoProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false); //флаг загрузки
  const [success, setSuccess] = useState(""); //успех загрузки
  const [error, setError] = useState(""); //ошибка при загрузке

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

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  //кол-во активных
  const activeCount = useMemo(() => {
    let count = 0;
    tasks.forEach((el) => {
      if (!el.isDone) count++;
    });
    return count;
  }, [tasks]);

  //фильтрация
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "active":
        return tasks.filter((item) => !item.isDone);
      case "completed":
        return tasks.filter((item) => item.isDone);
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

  //добавление задачи
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
        console.log('response.data: ', response.data);
        setTasks(response.data)
      } catch (error) {
        console.log(error);
      }

      // setTasks((prev) => [
      //   ...prev,
      //   { id: crypto.randomUUID(), title: result.trimmedText, isDone: false },
      // ]);
      // return true;

      //пример!!!!!!!!!
      //const resp = {
      //   id:6717,
      //   isCompleted:false,
      //   title: "asd",
      //   user_id: 2478
      // }
    },
    [validateText],
  );

  //изменение задачи
  const editTitle = useCallback(
    (id, newTitle, onError) => {
      const result = validateText(newTitle);
      if (!result.isValid) {
        onError?.(result.error);
        return false;
      }
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, title: result.trimmedText } : task,
        ),
      );
      return true;
    },
    [validateText],
  );
  //удаление задачи
  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);
  //переключатель
  const isDoneToggler = useCallback((id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task,
      ),
    );
  }, []);
  //очистка выполненных
  const clearCompeted = useCallback(() => {
    setTasks((prev) => prev.filter((task) => !task.isDone));
  }, []);

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
