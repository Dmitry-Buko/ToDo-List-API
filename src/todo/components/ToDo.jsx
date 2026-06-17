import ErrorSnackbar from "../mui components/ErrorSnackbar";
import { clearError } from "../RTK/taksSlice";
import FilteredTasks from "./FilteredTasks";
import InputTask from "./InputTask";
import ToDoList from "./ToDoList";
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
