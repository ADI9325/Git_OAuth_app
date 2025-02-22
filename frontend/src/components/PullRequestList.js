// components/PullRequestList.js
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
import { BASE_URL } from "../config";

const PullRequestList = ({ selectedRepos }) => {
  const [pullRequests, setPullRequests] = useState({});
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (!selectedRepos || selectedRepos.length === 0) {
      setPullRequests({});
      return;
    }

    const fetchPulls = async () => {
      setLoading(true);
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
      }
    };

    fetchPulls();
  }, [selectedRepos]);

  const hasPullRequests = Object.values(pullRequests).some(
    (prs) => prs.length > 0
  );

  return (
    <Box sx={{ mb: 4 }}>
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
            sx={{ bgcolor: "background.paper", borderRadius: 1, p: 0 }}
          >
            {prs.map((pr) => (
              <ListItem
                key={pr.id}
                sx={{
                  py: 1.5,
                  px: 2,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  "&:last-child": { borderBottom: "none" },
                  "&:hover": { bgcolor: "action.hover" },
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
                        sx={{ ml: 1, height: 20 }}
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
