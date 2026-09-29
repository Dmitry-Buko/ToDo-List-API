import { ITodo } from "@/types/types";

interface ITaskTextProps{
  task: ITodo;
}

const TaskText = ({task}: ITaskTextProps) => {
  return (
    <p className={`task__text ${task.completed ? "done" : ""}`}>
      {task.title}
    </p>
  );
};

export default TaskText;
