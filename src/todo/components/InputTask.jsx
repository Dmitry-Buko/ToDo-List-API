import { useCallback } from "react";
import ErrorBox from "../../shared/ui/ErrorBox";
import { useDispatch, useSelector } from "react-redux";
import { addTodos } from "../RTK/taksSlice";
import { addInputValue, setInputError } from "../RTK/inputSlice";
import AddTaskButton from "../mui components/AddTaskButton";
import TaskInput from "../mui components/TaskInput";
import Box from "@mui/material/Box";

const InputTask = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.task);
  const { inputValue, inputError } = useSelector((state) => state.text);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!inputValue.trim()) {
        dispatch(setInputError("ПУСТАЯ СТРОКА"));
        return;
      }
      dispatch(addTodos());
      dispatch(setInputError(""));
      dispatch(addInputValue(""));
    },
    [dispatch, inputValue],
  );

  return (
    <div className="todo__add-form">
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            gap: "12px",
            alignItems: "flex-start", 
            width: "100%",
          }}
        >
          <TaskInput
            value={inputValue}
            disabled={loading}
            error={inputError}
            helperText={inputError}
            onChange={(e) => {
              if (inputError) dispatch(setInputError(""));
              dispatch(addInputValue(e.target.value));
            }}
          />

          <AddTaskButton loading={loading} />
        </Box>
      </form>
      {/* {inputError && <ErrorBox error={inputError} />} */}
    </div>
  );
};

export default InputTask;
