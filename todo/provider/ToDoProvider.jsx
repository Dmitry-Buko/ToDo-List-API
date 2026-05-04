import { useState, useCallback, useMemo, useEffect } from "react";
import { ToDoContext } from "./ToDoContext";

export const ToDoProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("tasks");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Ошибка загрузки задач:", e);
      return [];
    }
  });
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  //кол-во активных
  const activeCount = useMemo(()=>{
    let count = 0
    tasks.forEach(el =>{
      if(!el.isDone) count++
    });
    return count
  },[tasks])
  
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
    return { isValid: true, trimmedText: trimmed };
  }, []);
  //добавление задачи
  const addTask = useCallback(
    (title, onError) => {
      const result = validateText(title);
      if (!result.isValid) {
        onError?.(result.error);
        return false;
      }
      setTasks((prev) => [
        ...prev,
        { id: crypto.randomUUID(), title: result.trimmedText, isDone: false },
      ]);
      return true;
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
  const clearCompeted = useCallback(()=>{
    setTasks((prev) => prev.filter((task) => !task.isDone));
  },[])
  
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
