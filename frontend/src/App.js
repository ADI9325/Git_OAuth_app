// App.js
import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { amber, grey } from "@mui/material/colors";
import { ColorModeContext } from "./context/ColorModeContext";

function App() {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                // palette values for light mode (unchanged)
                primary: amber,
                divider: amber[200],
                text: {
                  primary: grey[900],
                  secondary: grey[800],
                },
              }
            : {
                // palette values for black and white dark mode
                primary: {
                  main: "#ffffff", // White
                },
                background: {
                  default: "#000000", // Black
                  paper: "#000000", // Black
                },
                text: {
                  primary: "#ffffff", // White
                  secondary: grey[400], // Light grey for secondary text
                },
                divider: grey[800], // Dark grey for dividers
                action: {
                  active: "#ffffff", // White for active elements
                  hover: "rgba(255, 255, 255, 0.08)", // Slight white overlay for hover
                  selected: "rgba(255, 255, 255, 0.16)", // Slightly stronger for selected
                },
              }),
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                textTransform: "none",
                ...(mode === "dark" && {
                  borderColor: "#ffffff",
                  color: "#ffffff",
                }),
              },
            },
          },
          MuiCheckbox: {
            styleOverrides: {
              root: {
                ...(mode === "dark" && {
                  color: "#ffffff",
                }),
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
