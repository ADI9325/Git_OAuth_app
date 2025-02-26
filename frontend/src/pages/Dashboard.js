import React, { useState, useContext } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Box,
  useTheme,
  IconButton,
  Fade,
} from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import MergeIcon from "@mui/icons-material/Merge";
import BugReportIcon from "@mui/icons-material/BugReport";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import MenuIcon from "@mui/icons-material/Menu";
import Logout from "../components/Logout";
import RepositoryList from "../components/RepositoryList";
import UserProfile from "../components/UserProfile";
import { ColorModeContext } from "../context/ColorModeContext";
import HourglassEmpty from "@mui/icons-material/HourglassEmpty";
import { Brightness7, Brightness4 } from "@mui/icons-material";

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRepos, setSelectedRepos] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { mode: themeMode, toggleColorMode } = useContext(ColorModeContext);

  const handleTabChange = (event, newValue) => {
    navigate(`/dashboard/${newValue}`);
  };

  const handleSelectRepositories = (repos) => {
    console.log("Selecting repos:", repos);
    setSelectedRepos(repos);
    setIsFetching(true);
    console.log("isFetching set to true");
  };

  const getTabValue = (path) => {
    const pathSegments = path.split("/").filter(Boolean);
    return pathSegments[pathSegments.length - 1] || "code";
  };

  const tabs = [
    { label: "Code", icon: <CodeIcon />, value: "code" },
    { label: "Pull Requests", icon: <MergeIcon />, value: "pull-requests" },
    { label: "Issues", icon: <BugReportIcon />, value: "issues" },
    { label: "Branches", icon: <AccountTreeIcon />, value: "branches" },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box
        sx={{
          width: { xs: "100%", md: 256 },
          bgcolor: "background.paper",
          borderRight: `1px solid ${theme.palette.divider}`,
          position: { xs: "fixed", md: "static" },
          top: { xs: 0, md: "auto" },
          left: { xs: mobileMenuOpen ? 0 : "-100%", md: 0 },
          height: { xs: "100vh", md: "100%" },
          zIndex: 1200,
          transition: "left 0.3s ease-in-out",
          boxShadow: {
            xs: mobileMenuOpen ? "0 0 10px rgba(0,0,0,0.2)" : "none",
            md: "none",
          },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <UserProfile />
        <RepositoryList onSelectRepositories={handleSelectRepositories} />
      </Box>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor:
              theme.palette.mode === "dark" ? "#0d1117" : "#ffffff",
            boxShadow: "0 1px 0 rgba(0, 0, 0, 0.1)",
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Toolbar
            sx={{ justifyContent: "space-between", p: { xs: 1, sm: 2 } }}
          >
            <IconButton
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              sx={{ display: { md: "none" }, color: "text.primary" }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                fontWeight: 700,
                color: "text.primary",
                display: { xs: "none", sm: "block" },
              }}
            >
              Code-Clout
            </Typography>
            <Tabs
              value={getTabValue(location.pathname)}
              onChange={handleTabChange}
              aria-label="dashboard navigation"
              sx={{
                "& .MuiTabs-indicator": {
                  backgroundColor: theme.palette.primary.main,
                  height: 3,
                },
                display: { xs: "none", md: "block" },
              }}
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.value}
                  label={tab.label}
                  icon={tab.icon}
                  iconPosition="start"
                  value={tab.value}
                  sx={{
                    minWidth: 0,
                    px: 2,
                    textTransform: "none",
                    "&:hover": {
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.08)"
                          : "rgba(3, 102, 214, 0.08)",
                      color:
                        theme.palette.mode === "dark" ? "#ffffff" : "#0366d6",
                    },
                    "&.Mui-selected": {
                      color: theme.palette.primary.main,
                    },
                  }}
                />
              ))}
            </Tabs>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ThemeToggle />
              <Logout />
            </Box>
          </Toolbar>
        </AppBar>

        {isFetching && (
          <Fade in={isFetching} timeout={{ enter: 300, exit: 300 }}>
            <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1300,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <HourglassEmpty
                  sx={{
                    fontSize: 60,
                    color: themeMode === "dark" ? "#c9d1d9" : "#0366d6",
                    animation: "spin 1s linear infinite",
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{ color: themeMode === "dark" ? "#c9d1d9" : "#24292e" }}
                >
                  Loading...
                </Typography>
              </Box>
            </Box>
          </Fade>
        )}

        <Box
          sx={{
            flex: 1,
            p: 3,
            overflowY: "auto",
            bgcolor: "background.default",
          }}
        >
          <Outlet context={{ selectedRepos, setIsFetching }} />
        </Box>
      </Box>
    </Box>
  );
};

const ThemeToggle = () => {
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  return (
    <IconButton
      onClick={toggleColorMode}
      sx={{
        p: 1,
        color: "text.primary",
        "&:hover": { bgcolor: "action.hover" },
      }}
    >
      {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};

export default Dashboard;
