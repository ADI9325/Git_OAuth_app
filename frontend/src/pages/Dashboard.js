// pages/Dashboard.js
import React, { useState } from "react";
import {
  Box,
  Grid,
  Divider,
  useTheme,
  IconButton,
  Typography,
} from "@mui/material";
import UserProfile from "../components/UserProfile";
import RepositoryList from "../components/RepositoryList";
import BranchList from "../components/BranchList";
import PullRequestList from "../components/PullRequestList";
import IssueList from "../components/IssueList";
import Logout from "../components/Logout";
import { ColorModeContext } from "../context/ColorModeContext";
import { useContext } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const Dashboard = () => {
  const [selectedRepos, setSelectedRepos] = useState([]);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const repoName =
    selectedRepos.length > 0
      ? `${selectedRepos[0].owner.login}/${selectedRepos[0].name}`
      : null;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Box
        sx={{
          width: { xs: 260, sm: 300 },
          flexShrink: 0,
          bgcolor: "background.paper",
          borderRight: 1,
          borderColor: "divider",
          boxShadow: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
            position: "sticky",
            top: 0,
            zIndex: 1,
            bgcolor: "background.paper",
          }}
        >
          <Logout /> {/* Add Logout button here */}
          <IconButton
            onClick={colorMode.toggleColorMode}
            color="inherit"
            sx={{
              bgcolor: "action.hover",
              "&:hover": { bgcolor: "action.selected" },
            }}
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Box>
        <UserProfile />
        <Divider />
        <RepositoryList onSelectRepositories={setSelectedRepos} />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: "background.default",
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "-ms-overflow-style": "none",
        }}
      >
        {selectedRepos.length > 0 ? (
          <>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                fontWeight: 600,
                color: "text.primary",
                borderBottom: `1px solid ${theme.palette.divider}`,
                pb: 1,
              }}
            >
              {repoName}
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <BranchList selectedRepos={selectedRepos} />
              </Grid>
              <Grid item xs={12}>
                <PullRequestList selectedRepos={selectedRepos} />
              </Grid>
              <Grid item xs={12}>
                <IssueList selectedRepos={selectedRepos} />
              </Grid>
            </Grid>
          </>
        ) : (
          <Box sx={{ textAlign: "center", mt: 5 }}>
            <Typography variant="h5" color="text.secondary">
              Select a repository to view details
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
