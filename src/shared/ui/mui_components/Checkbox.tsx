import Checkbox from "@mui/material/Checkbox";
import { ChangeEventHandler } from "react";

interface ITaskCheckboxProps {
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function TaskCheckbox({
  checked,
  onChange,
}: ITaskCheckboxProps) {
  return (
    <Checkbox
      checked={checked}
      onChange={onChange}
      slotProps={{
        input: { "aria-label": "controlled" },
      }}
      sx={{
        color: "#ccc",
        "&.Mui-checked": {
          color: "#303a84",
        },
        "& .MuiSvgIcon-root": {
          fontSize: 20,
        },
        padding: "8px",
      }}
    />
  );
}
