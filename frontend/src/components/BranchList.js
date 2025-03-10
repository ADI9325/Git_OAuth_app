import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Box,
  useTheme,
} from "@mui/material";
import { useOutletContext } from "react-router-dom";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { BASE_URL } from "../config";

const BranchList = () => {
  const [branchesData, setBranchesData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const { selectedRepos, setIsFetching } = useOutletContext() || {
    selectedRepos: [],
  };

  useEffect(() => {
    if (!selectedRepos || selectedRepos.length === 0) {
      setBranchesData({});
      setIsFetching(false);
      return;
    }

    const fetchBranches = async () => {
      setLoading(true);
      setIsFetching(true);
      const newBranchesData = {};

      try {
        for (const repo of selectedRepos) {
          const owner = repo.owner.login;
          const repoName = repo.name;
          const branchesUrl = `${BASE_URL}/user/repos/${owner}/${repoName}/branches`;

          const response = await axios.get(branchesUrl, {
            withCredentials: true,
          });

          const branchNames = response.data
            .map((branch) => branch.name)
            .filter((name) => name.trim());

          newBranchesData[`${owner}/${repoName}`] = branchNames;
        }
        setBranchesData(newBranchesData);
      } catch (error) {
        console.error("Error fetching branches:", error);
        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to fetch branches"
        );
      } finally {
        setLoading(false);
        setIsFetching(false);
        console.log("Branches fetched, isFetching set to false");
      }
    };

    fetchBranches();
  }, [selectedRepos, setIsFetching]);

  const hasBranches = Object.values(branchesData).some(
    (branches) => branches.length > 0
  );

  return (
    <Box sx={{ mb: 4, p: 2 }}>
      <Typography
        variant="h6"
        sx={{ mb: 2, fontWeight: 500, color: "text.primary" }}
      >
        Branches
      </Typography>
      {loading ? (
        <CircularProgress size={24} />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : !hasBranches ? (
        <Typography color="text.secondary">
          No branches for this repository
        </Typography>
      ) : (
        Object.values(branchesData).map((branches, index) => (
          <List
            key={index}
            sx={{
              bgcolor: "background.paper",
              borderRadius: 1,
              p: 0,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            {branches.map((branch) => (
              <ListItem
                key={branch}
                sx={{
                  py: 1,
                  px: 2,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  "&:last-child": { borderBottom: "none" },
                  "&:hover": {
                    bgcolor: "action.hover",
                    transform: "translateX(4px)",
                    transition: "all 0.2s ease",
                  },
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", width: "100%" }}
                >
                  <AccountTreeIcon
                    sx={{
                      fontSize: "1rem",
                      mr: 1,
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#666",
                    }}
                  />
                  <ListItemText
                    primary={branch}
                    primaryTypographyProps={{
                      fontSize: "0.95rem",
                      fontFamily: "monospace",
                      color: "text.primary",
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(0, 0, 0, 0.05)",
                      px: 1,
                      py: 0.25,
                      borderRadius: 1,
                      display: "inline-block",
                    }}
                  />
                </Box>
              </ListItem>
            ))}
          </List>
        ))
      )}
    </Box>
  );
};

export default BranchList;
