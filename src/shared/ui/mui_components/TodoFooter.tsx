import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import type { Filter } from "@/types/types";
import { MouseEvent } from "react";

interface TodoFooterProps {
  filter: Filter;
  activeCount: number;
  onFilterChange: (filter: Filter) => void;
  onClearCompleted: () => void;
}

export default function TodoFooter({
  filter,
  activeCount,
  onFilterChange,
  onClearCompleted,
}: TodoFooterProps) {

  const handleFilterChange = (
    _: MouseEvent<HTMLElement>,
    newFilter: Filter | null,
  ) => {
    if (newFilter !== null) onFilterChange(newFilter);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "550px",
        margin: "24px auto 0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={handleFilterChange}
          size="small"
          sx={{
            backgroundColor: "#f7fafc",
            borderRadius: "12px",
            padding: "4px",
            border: "1px solid #eef2f6",
            "& .MuiToggleButtonGroup-grouped": {
              border: 0,
              borderRadius: "8px",
              "&:not(:first-of-type)": { borderRadius: "8px" },
            },
          }}
        >
          <ToggleButton
            value="all"
            sx={{
              textTransform: "none",
              padding: "6px 16px",
              fontWeight: 500,
              "&.Mui-selected": { backgroundColor: "#6366f1", color: "#fff" },
            }}
          >
            Все
          </ToggleButton>
          <ToggleButton
            value="active"
            sx={{
              textTransform: "none",
              padding: "6px 16px",
              fontWeight: 500,
              "&.Mui-selected": { backgroundColor: "#6366f1", color: "#fff" },
            }}
          >
            Активные
          </ToggleButton>
          <ToggleButton
            value="completed"
            sx={{
              textTransform: "none",
              padding: "6px 16px",
              fontWeight: 500,
              "&.Mui-selected": { backgroundColor: "#6366f1", color: "#fff" },
            }}
          >
            Завершенные
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 8px",
        }}
      >
        <Typography variant="body2" sx={{ color: "#718096", fontWeight: 500 }}>
          Осталось дел: {activeCount}
        </Typography>
        <Button
          variant="text"
          size="small"
          startIcon={<DeleteSweepIcon />}
          onClick={onClearCompleted}
          sx={{
            color: "#e53e3e",
            textTransform: "none",
            borderRadius: "12px",
            backgroundColor: "#fff5f5",
            "&:hover": { backgroundColor: "#fed7d7" },
          }}
        >
          Очистить выполненные
        </Button>
      </Box>
    </Box>
  );
}
