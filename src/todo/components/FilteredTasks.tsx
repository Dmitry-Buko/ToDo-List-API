import { useMemo } from "react";
import { useGetTodosQuery, useClearCompletedMutation } from "@/features/todos/taskApi";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectCurrentFilter } from "@/app/store";
import { setFilter } from "@/todo/store/taskSlice";
import TodoFooter from "@/shared/ui/mui_components/TodoFooter";
import type { Filter } from "@/types/types";

const FilteredTasks = () => {
  const dispatch = useAppDispatch();
  const { data: tasks = [] } = useGetTodosQuery();
  const filter = useAppSelector(selectCurrentFilter);
  const [clearCompleted] = useClearCompletedMutation();

  const activeCount = useMemo(
    () => tasks.filter((task) => !task.completed).length,
    [tasks],
  );

  const handleFilterChange = (newFilter: Filter) => {
    dispatch(setFilter(newFilter));
  };

  const handleClearCompleted = () => {
    const completedIds = tasks.filter((task) => task.completed).map((task) => task.id);
    if (completedIds.length > 0) clearCompleted(completedIds);
  };

  return (
    <TodoFooter
      filter={filter}
      activeCount={activeCount}
      onFilterChange={handleFilterChange}
      onClearCompleted={handleClearCompleted}
    />
  );
};

export default FilteredTasks;