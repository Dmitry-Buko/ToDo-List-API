import { useCallback, useState } from "react";
import ErrorBox from "../../shared/ui/ErrorBox";
import TaskText from "./TaskText";
import TaskEditForm from "./TaskEditForm";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodos, editTodos, togglerTodos } from "../RTK/taksSlice";
import TaskCheckbox from "../mui components/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Task = ({ task }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(task.title || "");
  const [localError, setError] = useState("");

  const { loading } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  const validateAndSave = useCallback(
    async (text) => {
      if (!text.trim()) {
        setError("Пустая строка");
        return;
      }
      await dispatch(editTodos({ id: task.id, newTitle: text }));
      setError("");
      setIsEdit(false);
      setEditText(text);
      return false;
    },
    [dispatch, task.id],
  );

  const handleKeyDown = async (e) => {
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
        "&:hover": {
          borderColor: "#dcdfe4",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "16px", flex: 1 }}>
        <TaskCheckbox
          checked={!!task.completed}
          onChange={() => dispatch(togglerTodos(task.id))}
        />
        <Box sx={{ flex: 1 }}>
          {isEdit ? (
            <Box
              sx={{ display: "flex", flexDirection: "column", width: "100%" }}
            >
              <TaskEditForm
                editText={editText}
                setEditText={setEditText}
                error={localError}
                setError={setError}
                handleKeyDown={handleKeyDown}
              />
              {localError && <ErrorBox error={localError} />}
            </Box>
          ) : (
            <TaskText task={task} />
          )}
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: "8px", marginLeft: "16px" }}>
        <LoadingButton
          onClick={toggleEdit}
          loading={!isEdit && loading}
          disabled={isEdit && loading}
          variant="text"
          size="small"
          startIcon={isEdit ? <CheckCircleIcon /> : <EditIcon />}
          sx={{
            color: isEdit ? "#2e7d32" : "#4a5568",
            textTransform: "none",
            borderRadius: "8px",
            backgroundColor: isEdit ? "#edf7ed" : "#f7fafc",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: isEdit ? "#e8f5e9" : "#edf2f7",
            },
            "&.Mui-disabled": {
              backgroundColor: "#f7fafc",
            },
          }}
        >
          {isEdit ? "Сохранить" : "Изменить"}
        </LoadingButton>

        <LoadingButton
          onClick={() => dispatch(deleteTodos(task.id))}
          loading={loading}
          variant="text"
          size="small"
          startIcon={<DeleteIcon />}
          sx={{
            color: "#e53e3e",
            textTransform: "none",
            borderRadius: "8px",
            backgroundColor: "#fff5f5",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "#fed7d7",
            },
            "&.Mui-disabled": {
              backgroundColor: "#fff5f5",
            },
          }}
        >
          Удалить
        </LoadingButton>
      </Box>
    </Paper>
  );
};

export default Task;
