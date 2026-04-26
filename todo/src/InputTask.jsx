import { useTodo } from "../provider/ToDoContext";


const InputTask = () => {

  const {handleChange, handleClick} = useTodo()
  
  return (
    <div>
      <input type="text" onChange={handleChange}/>
      <button onClick={handleClick}>Добавить</button>
    </div>
  );
};

export default InputTask;
