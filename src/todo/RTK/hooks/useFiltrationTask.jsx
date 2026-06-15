import { useMemo } from "react";
import { useSelector } from "react-redux";

const useFiltrationTask = () => {
  const { taskValue = [], filter = "all" } = useSelector((state) => state.task);

  const filteredTask = useMemo(() => {
    // console.log('taskValue', taskValue);
    
    switch (filter) {
      case "active":
        return taskValue.filter((item) => !item.completed);
      case "completed":
        return taskValue.filter((item) => item.completed);
      default:
        return taskValue;
    }
  }, [filter, taskValue]);
  return filteredTask;
};

export default useFiltrationTask;
