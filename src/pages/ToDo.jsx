import ErrorSnackbar from "../shared/ui/mui_components/ErrorSnackbar";
import { clearError } from "../todo/store/taskSlice";
import FilteredTasks from "../todo/components/FilteredTasks";
import InputTask from "../todo/components/InputTask";
import ToDoList from "../todo/components/ToDoList";
import { useSelector, useDispatch } from "react-redux";

const ToDo = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.task);

  return (
    <>
      <InputTask />
      <ToDoList />
      <FilteredTasks />
      <ErrorSnackbar
        errorMessage={error}
        onClose={() => dispatch(clearError())}
      />
    </>
  );
};

export default ToDo;
