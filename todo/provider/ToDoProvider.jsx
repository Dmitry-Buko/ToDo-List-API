import { useState } from "react";
import { ToDoContext } from "./ToDoContext";
import { useCallback } from "react";

export const ToDoProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    //___________список тасок
    {
      id: 1,
      title: "Положить плитку",
      isDone: false,
    },
    {
      id: 2,
      title: "Поклеить обои",
      isDone: false,
    },
  ]);

  console.log(tasks);//--------------------LOG
  

  const [text, setText] = useState(""); //------------------введенный текст в инпуте

  const handleChange = useCallback((e) => {
    setText(e.target.value);
  }, []); //------------------введенный текст в инпуте

  const handleClick = useCallback(() => {
    setTasks((tasks) => [
      ...tasks,
      { id: crypto.randomUUID(), title: text, isDone: false },
    ]);
  }, [text]); //------------------добавление задачи

  const deleteTask = useCallback((id) => {
    setTasks((item) => item.filter((task) => task.id !== id));
  }, []); //------------------удаление задачи

  const isDoneToggler = useCallback((id) => {
    setTasks((tasks) =>
      tasks.map((item) => (item.id === id ? { ...item, isDone: !item.isDone } : item)),
    );
  }, []);//------------------TOGGLER

  // ___VALUE___
  const value = {
    tasks,
    text,
    handleChange,
    handleClick,
    deleteTask,
    isDoneToggler,
  };

  return <ToDoContext.Provider value={value}>{children}</ToDoContext.Provider>;
};
