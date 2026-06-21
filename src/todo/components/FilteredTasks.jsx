import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCompetedTodos, setFilter } from "../store/taskSlice";
import { selectCurrentFilter, selectTodos } from "../../app/store";
import TodoFooter from "../../shared/ui/mui_components/TodoFooter";


const FilteredTasks = () => {
  const dispatch = useDispatch();
  const taskValue = useSelector(selectTodos)
  const filter = useSelector(selectCurrentFilter)

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
