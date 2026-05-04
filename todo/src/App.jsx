import Header from "./Header";
import InputTask from "./InputTask";
import ToDoList from "./ToDoList";
import FilteredTasks from "./FilteredTasks";


function App() {

  return (
    <div className="todo">
      <Header />
      <InputTask/>
      <ToDoList />
      <FilteredTasks />
    </div>
  );
}

export default App;
