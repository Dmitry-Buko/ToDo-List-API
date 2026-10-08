import FilteredTasks from "@/todo/components/FilteredTasks";
import InputTask from "@/todo/components/InputTask";
import ToDoList from "@/todo/components/ToDoList";

const ToDo = () => {
  return (
    <>
      <InputTask />
      <ToDoList />
      <FilteredTasks />
    </>
  );
};

export default ToDo;