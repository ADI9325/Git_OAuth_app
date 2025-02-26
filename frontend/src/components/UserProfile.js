import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Avatar, Typography, useTheme } from "@mui/material";
import { BASE_URL } from "../config";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/user/me`, { withCredentials: true })
      .then((res) => {
        console.log("User Data from API:", res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        setUser(null);
      });
  }, []);

  return (
    <Box
      sx={{
        padding: 2,
        textAlign: "center",
        bgcolor: "background.paper",
        color: "text.primary",
      }}
    >
      {user && user.profile ? (
        <>
          <Avatar
            alt={user.profile.username}
            src={user.profile.photos[0]?.value}
            sx={{
              width: 60,
              height: 60,
              margin: "0 auto",
              bgcolor: theme.palette.primary.main,
            }}
          />
          <Typography variant="h6" component="div" mt={1}>
            Welcome, {user.profile.username}!
          </Typography>
        </>
      ) : (
        <Typography>Loading user data...</Typography>
      )}
    </Box>
  );
};

export default UserProfile;
