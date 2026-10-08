import { useCallback, useState } from "react";
import type { SubmitEvent } from "react";
import AddTaskButton from "@/shared/ui/mui_components/AddTaskButton";
import TaskInput from "@/shared/ui/mui_components/TaskInput";
import Box from "@mui/material/Box";
import { useAddTodoMutation } from "@/features/todos/taskApi";
import { getErrorMessage } from "@/shared/lib/getError";

const InputTask = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [addTodo, { isLoading }] = useAddTodoMutation();

  const handleSubmit = useCallback(
    async (e: SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!value.trim()) {
        setError("Задача не может быть пустой!");
        return;
      }
      const result = await addTodo({ title: value });
      if ("error" in result) {
        setError(getErrorMessage(result.error) ?? "Не удалось добавить задачу");
        return;
      }
      setError("");
      setValue("");
    },
    [addTodo, value],
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
            value={value}
            disabled={isLoading}
            error={Boolean(error)}
            helperText={error}
            onChange={(e) => {
              if (error) setError("");
              setValue(e.target.value);
            }}
          />
          <AddTaskButton loading={isLoading} />
        </Box>
      </form>
    </div>
  );
};

export default InputTask;
