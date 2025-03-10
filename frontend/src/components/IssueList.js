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

const IssueList = () => {
  const [issues, setIssues] = useState({});
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const { selectedRepos, setIsFetching } = useOutletContext() || {
    selectedRepos: [],
  };

  useEffect(() => {
    if (!selectedRepos || selectedRepos.length === 0) {
      setIssues({});
      setIsFetching(false);
      return;
    }

    const fetchIssues = async () => {
      setLoading(true);
      setIsFetching(true);
      const newIssues = {};

      try {
        for (const repo of selectedRepos) {
          const response = await axios.get(
            `${BASE_URL}/user/repos/${repo.owner.login}/${repo.name}/issues`,
            { withCredentials: true }
          );
          newIssues[`${repo.owner.login}/${repo.name}`] = response.data;
        }
        setIssues(newIssues);
      } catch (err) {
        console.error("Error fetching issues:", err);
      } finally {
        setLoading(false);
        setIsFetching(false);
      }
    };

    fetchIssues();
  }, [selectedRepos, setIsFetching]);

  const hasIssues = Object.values(issues).some(
    (issuesList) => issuesList.length > 0
  );

  return (
    <Box sx={{ mb: 4, p: 2 }}>
      <Typography
        variant="h6"
        sx={{ mb: 2, fontWeight: 500, color: "text.primary" }}
      >
        Issues
      </Typography>
      {loading ? (
        <CircularProgress size={24} />
      ) : !hasIssues ? (
        <Typography color="text.secondary">
          No issues for this repository
        </Typography>
      ) : (
        Object.values(issues).map((issuesList, index) => (
          <List
            key={index}
            sx={{
              bgcolor: "background.paper",
              borderRadius: 1,
              p: 0,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            {issuesList.map((issue) => (
              <ListItem
                key={issue.id}
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
                      {issue.title}{" "}
                      <Chip
                        label={issue.state}
                        size="small"
                        color={issue.state === "open" ? "success" : "default"}
                        sx={{
                          ml: 1,
                          height: 20,
                          bgcolor:
                            issue.state === "open" ? "#2da44e" : "#6a737d",
                          color: "#ffffff",
                        }}
                      />
                    </>
                  }
                  secondary={
                    <>
                      by {issue.user.login} • Created:{" "}
                      {new Date(issue.created_at).toLocaleDateString()}
                      {issue.closed_at && (
                        <>
                          {" "}
                          • Closed:{" "}
                          {new Date(issue.closed_at).toLocaleDateString()}
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

export default IssueList;
