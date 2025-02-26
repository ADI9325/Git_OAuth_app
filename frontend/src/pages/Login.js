import React from "react";
import {
  Container,
  Button,
  Typography,
  Box,
  useTheme,
  Divider,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { BASE_URL } from "../config";

const Login = () => {
  const theme = useTheme();

  const handleLogin = () => {
    window.location.href = `${BASE_URL}/auth/github`;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: theme.palette.mode === "dark" ? "#161b22" : "#f6f8fa",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          textAlign: "center",
          p: 4,
          borderRadius: 1,
          bgcolor: theme.palette.mode === "dark" ? "#0d1117" : "#ffffff",
          color: theme.palette.mode === "dark" ? "#c9d1d9" : "#24292e",
          boxShadow: 3,
          border: `1px solid ${
            theme.palette.mode === "dark" ? "#30363d" : "#e1e4e8"
          }`,
        }}
      >
        {/* Logo or App Name */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            mb: 2,
            color: theme.palette.mode === "dark" ? "#ffffff" : "#24292e",
          }}
        >
          GitHub Dashboard
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            mb: 3,
            color: theme.palette.mode === "dark" ? "#8b949e" : "#6a737d",
          }}
        >
          Sign in to view your repositories, branches, pull requests, and
          issues.
        </Typography>

        {/* Login Button */}
        <Button
          variant="contained"
          startIcon={<GitHubIcon />}
          onClick={handleLogin}
          size="large"
          sx={{
            bgcolor: theme.palette.mode === "dark" ? "#238636" : "#2ea44f",
            color: "#ffffff",
            "&:hover": {
              bgcolor: theme.palette.mode === "dark" ? "#2ea44f" : "#238636",
            },
            borderRadius: 1,
            textTransform: "none",
            py: 1.5,
            px: 3,
            width: "100%",
            fontSize: "1rem",
            fontWeight: 500,
          }}
        >
          Sign in with GitHub
        </Button>

        {/* Divider */}
        <Divider
          sx={{
            my: 3,
            borderColor: theme.palette.mode === "dark" ? "#30363d" : "#e1e4e8",
          }}
        />

        {/* Footer-like Content */}
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.mode === "dark" ? "#8b949e" : "#6a737d",
          }}
        >
          By signing in, you agree to our{" "}
          <Box
            component="span"
            sx={{
              color: theme.palette.mode === "dark" ? "#58a6ff" : "#0366d6",
              "&:hover": { textDecoration: "underline", cursor: "pointer" },
            }}
          >
            Terms
          </Box>{" "}
          and{" "}
          <Box
            component="span"
            sx={{
              color: theme.palette.mode === "dark" ? "#58a6ff" : "#0366d6",
              "&:hover": { textDecoration: "underline", cursor: "pointer" },
            }}
          >
            Privacy Policy
          </Box>
          .
        </Typography>
      </Container>
    </Box>
  );
};

export default Login;
