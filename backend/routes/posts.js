import express from "express";
import multer from "multer";
import Post from "../models/Post.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// ⚡ Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // 👈 uploads folder me save hoga
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// 📝 Create a new post (title + image)
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const { title } = req.body;

    const newPost = new Post({
      title,
      image: req.file ? req.file.filename : null, // 👈 multer se filename milega
      author: req.user.username,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error("❌ Create post error:", err);
    res.status(500).json({ error: "Failed to create post" });
  }
});

// 📌 Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error("❌ Fetch posts error:", err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// 📌 Get single post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error("❌ Fetch post error:", err);
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

export default router;
