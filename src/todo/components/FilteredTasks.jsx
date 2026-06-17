import { useDispatch, useSelector } from "react-redux";
import { clearCompetedTodos, setFilter } from "../RTK/taksSlice";
import { useMemo } from "react";
import TodoFooter from "../mui components/TodoFooter";

const FilteredTasks = () => {
  const dispatch = useDispatch();
  const { taskValue, filter } = useSelector((state) => state.task);

  const activeCount = useMemo(() => {
    let count = 0;
    taskValue?.forEach((el) => {
      if (!el.completed) count++;
    });
    return count;
  }, [taskValue]);

  return (
    <TodoFooter
      filter={filter}
      activeCount={activeCount}
      dispatch={dispatch}
      setFilter={setFilter}
      clearCompetedTodos={clearCompetedTodos}
    />
  );
};

export default FilteredTasks;
