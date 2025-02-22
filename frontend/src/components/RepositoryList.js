// components/RepositoryList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CircularProgress,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import { BASE_URL } from "../config";

const RepositoryList = ({ onSelectRepositories }) => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRepoId, setSelectedRepoId] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/user/repos`, { withCredentials: true })
      .then((res) => {
        console.log("Repositories:", res.data);
        setRepositories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching repositories:", err);
        setLoading(false);
      });
  }, []);

  const handleSelect = (repo) => {
    setSelectedRepoId(repo.id);
    onSelectRepositories([repo]);
  };

  return (
    <Box sx={{ height: "calc(100vh - 160px)" }}>
      <Typography
        variant="h6"
        component="div"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          bgcolor: "background.paper",
          p: 2,
          pb: 1,
          mb: 2,
          fontWeight: 500,
          color: "text.primary",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        Your Repositories
      </Typography>
      <Box
        sx={{
          height: "calc(100% - 60px)",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: theme.palette.mode === "dark" ? "#333333" : "#e0e0e0",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: theme.palette.mode === "dark" ? "#ffffff" : "#1976d2",
            borderRadius: "4px",
            "&:hover": {
              background: theme.palette.mode === "dark" ? "#cccccc" : "#1565c0",
            },
          },
        }}
      >
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress size={30} />
          </Box>
        ) : (
          <List sx={{ p: 0, pb: 2 }}>
            {repositories.map((repo) => (
              <ListItem
                key={repo.id}
                disablePadding
                sx={{
                  mb: 0.5,
                  borderRadius: 1,
                  overflow: "hidden",
                }}
              >
                <ListItemButton
                  onClick={() => handleSelect(repo)}
                  selected={selectedRepoId === repo.id}
                  sx={{
                    py: 1.5,
                    px: 2,
                    borderRadius: 1,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? "rgba(88, 166, 255, 0.1)" // Light blue hover in dark mode
                          : "rgba(3, 102, 214, 0.1)", // Subtle blue hover in light mode
                      transform: "translateX(4px)",
                    },
                    "&.Mui-selected": {
                      bgcolor: "action.selected",
                      color: "primary.main",
                      "&:hover": {
                        bgcolor: "action.selected", // Keep selected state distinct
                      },
                    },
                  }}
                >
                  <ListItemText
                    primary={repo.name}
                    primaryTypographyProps={{
                      fontSize: "0.95rem",
                      fontWeight: selectedRepoId === repo.id ? 500 : 400,
                      color:
                        selectedRepoId === repo.id
                          ? "primary.main"
                          : "text.primary",
                      noWrap: true,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default RepositoryList;
