// backend/server.js
const express = require("express");
const dotenv = require('dotenv')
const cors = require("cors")
const { client } = require('./db/config');
const authMiddleware = require("./middleware/authmiddleware");
const flowRoutes = require("./routes/flowRoutes")
const userRoutes = require("./routes/userRoutes")
dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use("/api/flows", authMiddleware, flowRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1); // Optional, but containers usually exit automatically on unhandled errors.
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});