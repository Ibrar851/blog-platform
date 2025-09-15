import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import commentRoutes from "./routes/comments.js";
import postRoutes from "./routes/posts.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static serve for uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// Start Server
app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
