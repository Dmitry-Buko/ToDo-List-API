import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";

export default function ButtonLogout({ onClick }) {
  return (
    <Button
      variant="text"
      color="error"
      startIcon={<LogoutIcon />}
      onClick={onClick}
      sx={{
        textTransform: "none",
        fontWeight: "bold",
        borderRadius: "8px",
        padding: "6px 6px",
        height: "25px",
        position: "absolute",
        top: "0px",
        right: "20px",
        "&:hover": {
          backgroundColor: "rgba(211, 47, 47, 0.24)",
        },
      }}
    >
      Logout
    </Button>
  );
}
