import { useState, useCallback, useMemo, useEffect } from "react";
import { ToDoContext } from "./ToDoContext";

export const ToDoProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTask = localStorage.getItem('tasks');
      return savedTask ? JSON.parse(savedTask) : [];
    } catch (error) {
      console.error('Ошибка запроса данных:', error);
    }
  });

  useEffect(()=>{
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks))
    } catch (error) {
      console.error('Ошибка при сохранении задач:', error)
    }
  },[tasks])

  const addTask = useCallback((title) => {
    if (!title.trim()) return;
    setTasks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: title.trim(),
        isDone: false,
      },
    ]);
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const isDoneToggler = useCallback((id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task,
      ),
    );
  }, []);

  const editTitle = useCallback((id, newTitle) => {
    if (!newTitle.trim()) return;
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task,
      ),
    );
  }, []);

  const value = useMemo(
    () => ({
      tasks,
      addTask,
      deleteTask,
      isDoneToggler,
      editTitle,
    }),
    [tasks, addTask, deleteTask, isDoneToggler, editTitle],
  );

  return <ToDoContext.Provider value={value}>{children}</ToDoContext.Provider>;
};






  //THIS IS FOR EXAMPLE!!!!!!!!!!!!!!!!
  // const exampleTask = [
  //   {
  //     id: 1,
  //     title: "Положить плитку",
  //     isDone: false,
  //   },
  //   {
  //     id: 2,
  //     title: "Поклеить обои",
  //     isDone: false,
  //   },
  // ]
  // localStorage.setItem('tasks', JSON.stringify(exampleTask));