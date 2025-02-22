const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/me", (req, res) => {
  console.log("Session User:", req.user);
  if (req.user) {
    return res.json(req.user);
  }
  res.status(401).json({ message: "Not authenticated" });
});

// Fetch authenticated user's repositories
router.get("/repos", async (req, res) => {
  if (!req.user || !req.user.accessToken) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const response = await axios.get("https://api.github.com/user/repos", {
      headers: { Authorization: `Bearer ${req.user.accessToken}` },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching repos:", error);
    res.status(500).json({ error: "Failed to fetch repositories" });
  }
});

router.get("/repos/:owner/:repo/branches", async (req, res) => {
  if (!req.user || !req.user.accessToken) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const { owner, repo } = req.params;

  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/branches`,
      {
        headers: { Authorization: `Bearer ${req.user.accessToken}` },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching branches:", error);
    res.status(500).json({ error: "Failed to fetch branches" });
  }
});

router.get("/repos/:owner/:repo/pulls", async (req, res) => {
  if (!req.user || !req.user.accessToken) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const { owner, repo } = req.params;

  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/pulls?state=all`,
      {
        headers: { Authorization: `Bearer ${req.user.accessToken}` },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching PRs:", error);
    res.status(500).json({ error: "Failed to fetch pull requests" });
  }
});

router.get("/repos/:owner/:repo/issues", async (req, res) => {
  if (!req.user || !req.user.accessToken) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const { owner, repo } = req.params;

  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/issues?state=all`,
      {
        headers: { Authorization: `Bearer ${req.user.accessToken}` },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching issues:", error);
    res.status(500).json({ error: "Failed to fetch issues" });
  }
});

router.get("/repos/:owner/:repo/pullrequests", async (req, res) => {
  if (!req.user || !req.user.accessToken) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const { owner, repo } = req.params;

  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/pulls?state=all`,
      {
        headers: { Authorization: `Bearer ${req.user.accessToken}` },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching PRs:", error);
    res.status(500).json({ error: "Failed to fetch pull requests" });
  }
});

module.exports = router;
