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
    if (onSelectRepositories) {
      onSelectRepositories([repo]);
    }
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          px: 3,
          py: 2,
          fontWeight: 600,
          color: "text.primary",
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(180deg, #1c2526 0%, #161b22 100%)"
              : "linear-gradient(180deg, #f6f8fa 0%, #ffffff 100%)",
          borderBottom: `1px solid ${theme.palette.divider}`,
          position: "sticky",
          top: 0,
          zIndex: 1,
        }}
      >
        Repositories
      </Typography>
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: theme.palette.mode === "dark" ? "#2d333b" : "#f0f2f5",
          },
          "&::-webkit-scrollbar-thumb": {
            background: theme.palette.mode === "dark" ? "#adbac7" : "#90a4ae",
            borderRadius: "4px",
            "&:hover": {
              background: theme.palette.mode === "dark" ? "#cdd9e5" : "#78909c",
            },
          },
        }}
      >
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress size={32} color="primary" />
          </Box>
        ) : repositories.length === 0 ? (
          <Typography
            sx={{ p: 2, color: "text.secondary", textAlign: "center" }}
          >
            No repositories found
          </Typography>
        ) : (
          <List sx={{ p: 1 }}>
            {repositories.map((repo) => (
              <ListItem
                key={repo.id}
                disablePadding
                sx={{
                  mb: 0.75,
                  borderRadius: "8px",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow:
                      theme.palette.mode === "dark"
                        ? "0 2px 8px rgba(255,255,255,0.1)"
                        : "0 2px 8px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <ListItemButton
                  onClick={() => handleSelect(repo)}
                  selected={selectedRepoId === repo.id}
                  sx={{
                    py: 1.5,
                    px: 2.5,
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.08)"
                          : "rgba(3, 102, 214, 0.08)",
                      transform: "scale(1.02)",
                    },
                    "&.Mui-selected": {
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.15)"
                          : "rgba(3, 102, 214, 0.15)",
                      "&:hover": {
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.2)"
                            : "rgba(3, 102, 214, 0.2)",
                      },
                    },
                  }}
                >
                  <ListItemText
                    primary={repo.name}
                    primaryTypographyProps={{
                      fontSize: "1rem",
                      fontWeight: selectedRepoId === repo.id ? 500 : 400,
                      color:
                        selectedRepoId === repo.id
                          ? "primary.main"
                          : "text.primary",
                      noWrap: true,
                      sx: { textOverflow: "ellipsis" },
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
