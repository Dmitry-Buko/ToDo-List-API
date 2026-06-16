import { useDispatch, useSelector } from "react-redux";
import { clearCompetedTodos, setFilter } from "../RTK/taksSlice";
import { useMemo } from "react";

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
    <div className="todo__footer">
      <div className="filters">
        <button
          className={`filters__btn ${filter === "all" ? "filters__btn--active" : ""}`}
          onClick={() => dispatch(setFilter("all"))}
        >
          Все
        </button>
        <button
          className={`filters__btn ${filter === "active" ? "filters__btn--active" : ""}`}
          onClick={() => dispatch(setFilter("active"))}
        >
          Активные
        </button>
        <button
          className={`filters__btn ${filter === "completed" ? "filters__btn--active" : ""}`}
          onClick={() => dispatch(setFilter("completed"))}
        >
          Завершенные
        </button>
      </div>
      <div className="footer">
        <p className="todo__counter">Осталось дел: {activeCount}</p>
        <button
          className="todo__clear-completed"
          onClick={() => dispatch(clearCompetedTodos())}
        >
          Очистить выполненные
        </button>
      </div>
    </div>
  );
};

export default FilteredTasks;
