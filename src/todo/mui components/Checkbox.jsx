// import * as React from 'react';
import Checkbox from "@mui/material/Checkbox";

export default function TaskCheckbox({ checked, onChange }) {
  // const [checked, setChecked] = React.useState(true);

  // const handleChange = (event) => {
  //   setChecked(event.target.checked);
  // };

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
