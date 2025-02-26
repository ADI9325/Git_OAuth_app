import React, { useState, useMemo } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PullRequestList from "./components/PullRequestList";
import IssueList from "./components/IssueList";
import BranchList from "./components/BranchList";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
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
                primary: {
                  main: "#0366d6",
                },
                background: {
                  default: "#f6f8fa",
                  paper: "#ffffff",
                },
                text: {
                  primary: grey[900],
                  secondary: grey[600],
                },
                divider: "#e1e4e8",
                action: {
                  active: "#0366d6",
                  hover: "rgba(3, 102, 214, 0.08)",
                  selected: "rgba(3, 102, 214, 0.16)",
                },
              }
            : {
                primary: {
                  main: "#ffffff",
                },
                background: {
                  default: "#0d1117",
                  paper: "#161b22",
                },
                text: {
                  primary: "#ffffff",
                  secondary: grey[400],
                },
                divider: grey[800],
                action: {
                  active: "#ffffff",
                  hover: "rgba(255, 255, 255, 0.08)",
                  selected: "rgba(255, 255, 255, 0.16)",
                },
              }),
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 4,
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
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: mode === "dark" ? "#0d1117" : "#ffffff",
                boxShadow: "0 1px 0 rgba(0, 0, 0, 0.1)",
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
            <Route path="/dashboard/*" element={<Dashboard />}>
              <Route path="" element={<Navigate to="code" />} />
              <Route
                path="code"
                element={<PullRequestList selectedRepos={[]} />}
              />
              <Route
                path="pull-requests"
                element={<PullRequestList selectedRepos={[]} />}
              />
              <Route path="issues" element={<IssueList selectedRepos={[]} />} />
              <Route
                path="branches"
                element={<BranchList selectedRepos={[]} />}
              />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
