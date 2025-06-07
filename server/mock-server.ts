import express from "express";
import { setupVite } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mock API endpoints
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Mock user data
const mockUser = {
  id: 1,
  name: "Demo User",
  email: "demo@example.com",
  tier: "Elite"
};

app.get("/api/user", (req, res) => {
  res.json(mockUser);
});

// Setup Vite middleware for development
if (process.env.NODE_ENV === "development") {
  setupVite(app);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
