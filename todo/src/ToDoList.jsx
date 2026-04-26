import { useTodo } from "../provider/ToDoContext";
import Task from "./Task";

const ToDoList = () => {
  const { tasks } = useTodo();

  return (
    <div>
      {tasks.map((item) => (
        <Task key={item.id} task={item} />
      ))}
    </div>
  );
};

export default ToDoList;
