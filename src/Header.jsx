import { useTodo } from "./provider/ToDoContext";

const Header = () => {
  const { error } = useTodo();
  return (
    <>
      <h1 className="todo__title">ToDo List API</h1>
      {error ? <p className="error-message">{ error }</p> : ""}
    </>
  );
};

export default Header;
