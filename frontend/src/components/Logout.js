// src/components/Logout.js
import React from "react";
import { Button, useTheme, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const Logout = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${BASE_URL}/auth/logout`, { withCredentials: true });
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
      navigate("/");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: { xs: "100%", sm: "auto" },
        px: { xs: 1, sm: 0 },
      }}
    >
      <Button
        variant="outlined"
        onClick={handleLogout}
        startIcon={<ExitToAppIcon />}
        sx={{
          color: "text.primary",
          borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#e1e4e8",
          borderRadius: 1,
          textTransform: "none",
          fontSize: { xs: "0.85rem", sm: "0.95rem" },
          fontWeight: 500,
          px: { xs: 1.5, sm: 2 },
          py: { xs: 0.5, sm: 0.75 },
          minWidth: { xs: 80, sm: 100 },
          bgcolor:
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.05)"
              : "transparent",
          transition: "all 0.2s ease",
          "&:hover": {
            bgcolor: theme.palette.mode === "dark" ? "#238636" : "#2ea44f",
            borderColor: theme.palette.mode === "dark" ? "#238636" : "#2ea44f",
            color: "#ffffff",
          },
          "&:active": {
            bgcolor: theme.palette.mode === "dark" ? "#1c6e2d" : "#238636",
          },
        }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Logout;
