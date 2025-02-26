import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Chip,
  Box,
  useTheme,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useOutletContext } from "react-router-dom";
import { BASE_URL } from "../config";

const PullRequestList = () => {
  const [pullRequests, setPullRequests] = useState({});
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const { selectedRepos, setIsFetching } = useOutletContext() || {
    selectedRepos: [],
  };

  useEffect(() => {
    if (!selectedRepos || selectedRepos.length === 0) {
      setPullRequests({});
      setIsFetching(false);
      return;
    }

    const fetchPulls = async () => {
      setLoading(true);
      setIsFetching(true);
      const newPulls = {};

      try {
        for (const repo of selectedRepos) {
          const response = await axios.get(
            `${BASE_URL}/user/repos/${repo.owner.login}/${repo.name}/pulls`,
            { withCredentials: true }
          );
          newPulls[`${repo.owner.login}/${repo.name}`] = response.data;
        }
        setPullRequests(newPulls);
      } catch (err) {
        console.error("Error fetching pull requests:", err);
      } finally {
        setLoading(false);
        setIsFetching(false);
        console.log("Pull requests fetched, isFetching set to false");
      }
    };

    fetchPulls();
  }, [selectedRepos, setIsFetching]);

  const hasPullRequests = Object.values(pullRequests).some(
    (prs) => prs.length > 0
  );

  return (
    <Box sx={{ mb: 4, p: 2 }}>
      <Typography
        variant="h6"
        sx={{ mb: 2, fontWeight: 500, color: "text.primary" }}
      >
        Pull Requests
      </Typography>
      {loading ? (
        <CircularProgress size={24} />
      ) : !hasPullRequests ? (
        <Typography color="text.secondary">
          No pull requests for this repository
        </Typography>
      ) : (
        Object.values(pullRequests).map((prs, index) => (
          <List
            key={index}
            sx={{
              bgcolor: "background.paper",
              borderRadius: 1,
              p: 0,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            {prs.map((pr) => (
              <ListItem
                key={pr.id}
                sx={{
                  py: 1.5,
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
                <ListItemText
                  primary={
                    <>
                      {pr.title}{" "}
                      <Chip
                        label={pr.state}
                        size="small"
                        color={pr.state === "open" ? "success" : "default"}
                        sx={{
                          ml: 1,
                          height: 20,
                          bgcolor: pr.state === "open" ? "#2da44e" : "#6a737d",
                          color: "#ffffff",
                        }}
                      />
                    </>
                  }
                  secondary={
                    <>
                      by {pr.user.login} • Created:{" "}
                      {new Date(pr.created_at).toLocaleDateString()}
                      {pr.closed_at && (
                        <>
                          {" "}
                          • Closed:{" "}
                          {new Date(pr.closed_at).toLocaleDateString()}
                        </>
                      )}
                    </>
                  }
                  primaryTypographyProps={{
                    fontSize: "0.95rem",
                    color: "text.primary",
                  }}
                  secondaryTypographyProps={{
                    fontSize: "0.85rem",
                    color: "text.secondary",
                  }}
                />
              </ListItem>
            ))}
          </List>
        ))
      )}
    </Box>
  );
};

export default PullRequestList;
