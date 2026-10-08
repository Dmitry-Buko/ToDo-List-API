import { useCallback, useState } from "react";
import TaskText from "@/shared/ui/TaskText";
import TaskEditForm from "@/shared/ui/TaskEditForm";
import TaskCheckbox from "@/shared/ui/mui_components/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  useDeleteTodoMutation,
  useEditTodoMutation,
  useTogglerTodoMutation,
} from "@/features/todos/taskApi";
import { getErrorMessage } from "@/shared/lib/getError";
import type { ITodo } from "@/types/types";

interface TaskProps {
  task: ITodo;
}

const Task = ({ task }: TaskProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(task.title);
  const [error, setError] = useState("");

  const [editTodo, { isLoading: isEditing }] = useEditTodoMutation();
  const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation();
  const [togglerTodo] = useTogglerTodoMutation();

  const validateAndSave = useCallback(
    async (text: string) => {
      if (!text.trim()) {
        setError("Задача не может быть пустой!");
        return;
      }
      const result = await editTodo({ id: task.id, newTitle: text });
      if ("error" in result) {
        setError(getErrorMessage(result.error) ?? "Не удалось сохранить");
        return;
      }
      setError("");
      setIsEdit(false);
      setEditText(text);
    },
    [editTodo, task.id],
  );

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      await validateAndSave(editText);
    } else if (e.key === "Escape") {
      setIsEdit(false);
      setEditText(task.title);
      setError("");
    }
  };

  const toggleEdit = async () => {
    if (isEdit) {
      await validateAndSave(editText);
    } else {
      setIsEdit(true);
      setError("");
    }
  };

  const handleDelete = async () => {
    const result = await deleteTodo(task.id);
    if ("error" in result) {
      setError(getErrorMessage(result.error) ?? "Не удалось удалить задачу");
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 16px",
        borderRadius: "12px",
        border: "1px solid #eef2f6",
        backgroundColor: "#fff",
        width: "100%",
        maxWidth: "550px",
        margin: "8px auto",
        transition: "all 0.2s ease",
        "&:hover": { borderColor: "#dcdfe4" },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "16px", flex: 1 }}>
        <TaskCheckbox
          checked={task.completed}
          onChange={() => togglerTodo(task.id)}
        />
        <Box sx={{ flex: 1 }}>
          {isEdit ? (
            <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
              <TaskEditForm
                editText={editText}
                setEditText={setEditText}
                error={error}
                setError={setError}
                handleKeyDown={handleKeyDown}
              />
            </Box>
          ) : (
            <TaskText task={task} />
          )}
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: "8px", marginLeft: "16px" }}>
        <Button
          onClick={toggleEdit}
          loading={!isEdit && isEditing}
          disabled={isEdit && isEditing}
          variant="text"
          size="small"
          startIcon={isEdit ? <CheckCircleIcon /> : <EditIcon />}
          sx={{
            color: isEdit ? "#2e7d32" : "#4a5568",
            textTransform: "none",
            borderRadius: "8px",
            backgroundColor: isEdit ? "#edf7ed" : "#f7fafc",
            fontWeight: 500,
            "&:hover": { backgroundColor: isEdit ? "#e8f5e9" : "#edf2f7" },
            "&.Mui-disabled": { backgroundColor: "#f7fafc" },
          }}
        />
        <Button
          onClick={handleDelete}
          loading={isDeleting}
          variant="text"
          size="small"
          startIcon={<DeleteIcon />}
          sx={{
            color: "#e53e3e",
            textTransform: "none",
            borderRadius: "8px",
            backgroundColor: "#fff5f5",
            fontWeight: 500,
            "&:hover": { backgroundColor: "#fed7d7" },
            "&.Mui-disabled": { backgroundColor: "#fff5f5" },
          }}
        />
      </Box>
    </Paper>
  );
};

export default Task;