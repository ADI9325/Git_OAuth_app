# GitHub Branch Explorer

A **full-stack GitHub OAuth application** that allows users to authenticate via GitHub, select repositories, and visualize **branches, pull requests (PRs), and issues** in a modern, user-friendly interface. This project fulfills the **Branch Task requirements** for the Full-Stack DevOps Tool Candidate Tasks.

## 📂 Repository

[GitHub: ADI9325/Git_auth_app](https://github.com/ADI9325/Git_auth_app)

## 🚀 Features

### ✅ Core Features

- **User Authentication via GitHub OAuth**
  - Secure sign-in using GitHub OAuth, granting access to user repositories.
- **Repository Selection**
  - Fetches and displays repositories in a stylish sidebar.
  - Supports single repository selection (multi-select planned for future updates).
- **Branch Visualization**
  - Displays repository branches with a **modern UI**, including hover effects.
  - Tabbed navigation for seamless switching between **Branches, PRs, and Issues**.

### 🎯 Bonus Features

- **Pull Requests (PRs) Overview**
  - Displays open and closed PRs with **author, creation date, and status**.
- **Issues Overview**
  - Lists open and closed issues with **detailed metadata**.

## 🛠️ Tech Stack

**Frontend:** React, Material-UI (MUI), Axios, React Router  
**Backend:** Node.js, Express, Passport.js (GitHubStrategy), Axios  
**Authentication:** GitHub OAuth  
**GitHub API:** REST API (Repositories, Branches, PRs, Issues)  
**State Management:** React Context API (theme toggle)  
**Session Management:** Express-session with Passport.js

## 📁 Project Structure

```
Git_auth_app/
├── backend/ # Node.js/Express backend
│   ├── routes/
│   │   ├── auth.js # OAuth routes
│   │   └── user.js # GitHub API routes
│   ├── passport.js # Passport.js configuration
│   ├── index.js # Main server file
│   ├── .env # Environment variables (not tracked)
│   └── package.json
├── frontend/ # React frontend
│   ├── src/
│   │   ├── components/ # Reusable components (e.g., RepositoryList)
│   │   ├── pages/ # Page components (e.g., Dashboard)
│   │   ├── context/ # ColorModeContext
│   │   ├── config.js # Backend URL config
│   │   └── App.js # Main app component
│   └── package.json
└── README.md # This file
```

## ⚙️ Prerequisites

- **Node.js:** v16.x or later
- **npm:** v8.x or later
- **GitHub OAuth App:** Client ID and Secret from GitHub Developer Settings

## 🏗️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/ADI9325/Git_auth_app.git
cd Git_auth_app
```

### 2️⃣ Backend Setup

Navigate to Backend:

```bash
cd backend
```

Install Dependencies:

```bash
npm install
```

Configure Environment Variables:
Create a `.env` file in `backend/`:

```
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
SESSION_SECRET=your_session_secret
```

Replace the placeholders with your GitHub OAuth credentials.

Start the Backend:

```bash
npm start
```

Runs on **http://localhost:5000**.

### 3️⃣ Frontend Setup

Navigate to Frontend:

```bash
cd ../frontend
```

Install Dependencies:

```bash
npm install
```

Configure Backend URL:
Edit `frontend/src/config.js`:

```javascript
export const BASE_URL = "http://localhost:5000";
```

Start the Frontend:

```bash
npm start
```

Runs on **http://localhost:3000**.

### 4️⃣ GitHub OAuth Configuration

- Register an OAuth App on **GitHub Developer Settings**:
  - **Homepage URL:** `http://localhost:3000`
  - **Authorization Callback URL:** `http://localhost:5000/auth/github/callback`
- Update `backend/.env` with the generated **Client ID** and **Secret**.

## 🖥️ Usage

### ▶️ Start the Application

Ensure both **backend** (`npm start` in `backend/`) and **frontend** (`npm start` in `frontend/`) are running.

### 🔐 Sign In

1. Open **http://localhost:3000** in your browser.
2. Click **"Sign in with GitHub"** and authorize the app.

### 📌 Select a Repository

- After login, repositories appear in the sidebar.
- Click a repository to view its data.

### 🔎 Explore Data

- **Branches:** Monospace list with tree icons.
- **PRs:** Open/closed status with metadata.
- **Issues:** Open/closed status with dates.

### 🌗 Toggle Theme

Click the **sun/moon** icon (top-right) for light/dark mode.

### 🔓 Logout

Click **"Logout"** to end the session and return to the login page.

## 🔍 Implementation Details

### 🏗 Backend

- **Authentication:** Passport.js manages **GitHub OAuth**, storing user profile and access token in session.
- **Routes:**
  - `/auth/github`: Initiates OAuth flow.
  - `/auth/github/callback`: Redirects to dashboard on success.
  - `/user/me`: Returns user profile.
  - `/user/repos`: Fetches repositories.
  - `/repos/:owner/:repo/*`: Endpoints for branches, PRs, and issues.

### 🎨 Frontend

- **Dashboard:** Sidebar with **RepositoryList**, tabs for content.
- **Components:** `BranchList`, `PullRequestList`, `IssueList` for data display.
- **Theme:** Managed via `ColorModeContext` with Material-UI theming.
- **UI/UX:** Responsive design with GitHub-inspired colors and smooth animations.

## 🛠️ Challenges Faced

- **Loading State:** Fixed persistent loading icon by resetting `isFetching` in child components.
- **Session Persistence:** Configured **Express-session** with **Passport.js** for secure user data storage.
- **API Rate Limits:** Implemented basic error handling; could be enhanced with **retry logic**.

## 📚 External Resources

- **[Passport.js](https://www.passportjs.org/)** - Authentication
- **[GitHub REST API](https://docs.github.com/en/rest)** - Data fetching
- **[Material-UI](https://mui.com/)** - UI components
- **[Axios](https://axios-http.com/)** - HTTP requests
- **[React Router](https://reactrouter.com/)** - Navigation
- **[Express-session](https://www.npmjs.com/package/express-session)** - Session management

## 🎥 Video Demo

🚀 Watch the screencast **[here](#)** (Replace with your link) to see:

- OAuth login flow
- Repository selection
- Branch/PR/Issues visualization
- Theme toggle
- Logout process

## 📈 Future Enhancements

- ✅ **Multi-repository selection** with aggregated views.
- 🔥 **Caching (e.g., Redis)** for API responses.
- ⏳ **Real-time updates** via GitHub webhooks.
- 🌳 **Interactive branch tree visualization** (e.g., D3.js).

---

**Made with ❤️ by ADI9325**
